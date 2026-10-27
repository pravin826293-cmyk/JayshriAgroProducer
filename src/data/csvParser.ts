import { MasterFarmer, ProcurementLot, AssayingParameter, CsvValidationResult } from '../types';

export function parseCSVText(csvText: string): string[][] {
  const rows: string[][] = [];
  let currentRow: string[] = [];
  let currentField = '';
  let insideQuotes = false;

  for (let i = 0; i < csvText.length; i++) {
    const char = csvText[i];
    const nextChar = csvText[i + 1];

    if (char === '"') {
      if (insideQuotes && nextChar === '"') {
        currentField += '"';
        i++; // skip escaped quote
      } else {
        insideQuotes = !insideQuotes;
      }
    } else if (char === ',' && !insideQuotes) {
      currentRow.push(currentField.trim());
      currentField = '';
    } else if ((char === '\r' || char === '\n') && !insideQuotes) {
      if (char === '\r' && nextChar === '\n') {
        i++; // handle CRLF
      }
      currentRow.push(currentField.trim());
      currentField = '';
      if (currentRow.length > 1 || (currentRow.length === 1 && currentRow[0] !== '')) {
        rows.push(currentRow);
      }
      currentRow = [];
    } else {
      currentField += char;
    }
  }

  if (currentField !== '' || currentRow.length > 0) {
    currentRow.push(currentField.trim());
    if (currentRow.length > 1 || (currentRow.length === 1 && currentRow[0] !== '')) {
      rows.push(currentRow);
    }
  }

  return rows;
}

export function parseAssayingParameters(paramsStr: string, valuesStr: string): AssayingParameter[] {
  if (!paramsStr || !valuesStr) return [];
  const keys = paramsStr.split('~').map((k) => k.trim()).filter(Boolean);
  const vals = valuesStr.split('~').map((v) => v.trim()).filter((v) => v !== '');

  const result: AssayingParameter[] = [];
  for (let i = 0; i < Math.min(keys.length, vals.length); i++) {
    const name = keys[i];
    const val = vals[i];
    if (name && val && val !== '~' && val !== 'null') {
      result.push({ name, value: `${val}%` });
    }
  }
  return result;
}

function cleanVal(str: string | undefined): string {
  if (!str) return '';
  return str.replace(/^\t+/, '').trim();
}

export function processLotCsvRows(rows: string[][]): {
  farmers: MasterFarmer[];
  lots: ProcurementLot[];
  validation: CsvValidationResult;
} {
  if (rows.length === 0) {
    return {
      farmers: [],
      lots: [],
      validation: {
        totalRows: 0,
        validRows: 0,
        invalidRows: 0,
        duplicateRows: 0,
        importedFarmersCount: 0,
        importedLotsCount: 0,
        errors: [],
        previewFarmers: [],
        previewLots: [],
      },
    };
  }

  const headerRow = rows[0].map((h) => cleanVal(h).toLowerCase().replace(/[^a-z0-9]/g, ''));
  const headerMap: Record<string, number> = {};
  headerRow.forEach((col, idx) => {
    headerMap[col] = idx;
  });

  const getCol = (row: string[], nameVariant: string[]): string => {
    for (const name of nameVariant) {
      const idx = headerMap[name.toLowerCase().replace(/[^a-z0-9]/g, '')];
      if (idx !== undefined && row[idx] !== undefined) {
        return cleanVal(row[idx]);
      }
    }
    return '';
  };

  const farmerMap = new Map<string, MasterFarmer>();
  const lotsList: ProcurementLot[] = [];
  const errors: { row: number; error: string; rawData?: Record<string, string> }[] = [];
  let duplicateRows = 0;
  const seenLotRefs = new Set<string>();

  for (let rowIndex = 1; rowIndex < rows.length; rowIndex++) {
    const row = rows[rowIndex];
    if (row.length === 0 || (row.length === 1 && !row[0])) continue;

    const farmerName = getCol(row, ['Farmer Name', 'FarmerName', 'Name']);
    const pssId = getCol(row, ['PSS Id', 'PSSId', 'PSS']);
    const aadhaarRef = getCol(row, ['Farmer Aadhaar Reference No', 'Aadhaar Reference No', 'AadhaarRef']);
    const mobileNo = getCol(row, ['Mobile No', 'MobileNumber', 'Mobile']);
    const center = getCol(row, ['Center', 'Procurement Center']) || 'KERWADI';
    const nominee = getCol(row, ['Nominee Name', 'Nominee']);
    const procuredFrom = getCol(row, ['Procured From', 'ProcuredFrom']) || 'FARMER';
    const sellerTmId = getCol(row, ['Seller Tm Id', 'SellerTmId']);

    if (!farmerName) {
      errors.push({
        row: rowIndex + 1,
        error: 'Missing mandatory Farmer Name',
        rawData: { rowData: row.slice(0, 5).join(', ') },
      });
      continue;
    }

    const lotId = getCol(row, ['Lot Id', 'LotId']);
    const lotRef = getCol(row, ['Lot Reference Number', 'Lot Ref Number', 'LotRefNumber']);
    const billNo = getCol(row, ['Bill Number', 'BillNumber', 'Bill No']);
    const appId = getCol(row, ['Application Id', 'ApplicationId']);
    const scheme = getCol(row, ['Scheme']) || 'PSS CHANA PROCUREMENT RABI 2026';
    const season = getCol(row, ['Season']) || 'Rabi 2026';
    const commodity = getCol(row, ['Commodity']) || 'BENGAL GRAM (CHANA)';
    const packageType = getCol(row, ['Package Type', 'PackageType']) || '50 KG JUTE BAG';
    const lotCreatedDate = getCol(row, ['Lot Created Date', 'LotCreatedDate']) || new Date().toISOString().split('T')[0];
    const lotModifiedDate = getCol(row, ['Lot Modified Date', 'LotModifiedDate']);
    const lotCreatedBy = getCol(row, ['Lot Created By', 'LotCreatedBy']);
    const noOfBags = parseFloat(getCol(row, ['No of Bags', 'Bags'])) || 0;
    const quantity = parseFloat(getCol(row, ['Quantity', 'Qty'])) || 0;
    const actualQuantity = parseFloat(getCol(row, ['Actual Quantity', 'ActualQuantity'])) || quantity;
    const price = parseFloat(getCol(row, ['Price', 'Rate'])) || 5875;
    const tradeValue = parseFloat(getCol(row, ['Trade Value', 'TradeValue'])) || (quantity * price);
    const lotStatus = getCol(row, ['Lot Status', 'LotStatus']) || 'Completed';
    const dispatchStatus = getCol(row, ['Dispatch Status', 'DispatchStatus']) || 'Confirmed Dispatch';
    const isDocGenerated = getCol(row, ['Is Doc Generated', 'IsDocGenerated']) || 'YES';
    const qrScannedStatus = getCol(row, ['QR Scanned Status', 'QRScannedStatus']) || 'YES';
    const assayingParams = getCol(row, ['Assaying Params', 'AssayingParams']);
    const assayingParamsValues = getCol(row, ['Assaying Params Values', 'AssayingParamsValues']);
    const remark = getCol(row, ['Remark']) || '';

    // Check duplicate lot ref
    const lotUniqueKey = `${lotRef || lotId || billNo}-${rowIndex}`;
    if (lotRef && seenLotRefs.has(lotRef)) {
      duplicateRows++;
    }
    if (lotRef) {
      seenLotRefs.add(lotRef);
    }

    // Farmer Key: preference pssId -> aadhaarRef -> farmerName
    const farmerKey = pssId ? `PSS_${pssId}` : aadhaarRef ? `AADHAAR_${aadhaarRef}` : `NAME_${farmerName.toLowerCase()}`;

    let farmer = farmerMap.get(farmerKey);
    if (!farmer) {
      farmer = {
        id: `FMR-${farmerKey.replace(/[^a-zA-Z0-9_-]/g, '')}`,
        pssId: pssId || 'N/A',
        fullName: farmerName,
        aadhaarRef: aadhaarRef ? `•••• •••• ${aadhaarRef.slice(-4)}` : 'N/A',
        mobileNumber: mobileNo || 'N/A',
        center: center,
        village: center === 'KERWADI' ? 'Kerwadi' : 'Parbhani Rural',
        taluka: 'Palam / Gangakhed',
        district: 'Parbhani',
        nomineeName: nominee,
        procuredFrom: procuredFrom,
        sellerTmId: sellerTmId,
        totalLotsCount: 0,
        totalQuantityQtl: 0,
        totalBags: 0,
        totalTradeValue: 0,
        status: 'Active',
        category: 'Small Farmer',
        createdAt: lotCreatedDate,
        updatedAt: lotModifiedDate || lotCreatedDate,
      };
      farmerMap.set(farmerKey, farmer);
    }

    farmer.totalLotsCount += 1;
    farmer.totalQuantityQtl += actualQuantity;
    farmer.totalBags += noOfBags;
    farmer.totalTradeValue += tradeValue;

    const parsedAssaying = parseAssayingParameters(assayingParams, assayingParamsValues);

    const lot: ProcurementLot = {
      id: `LOT-${lotUniqueKey}`,
      farmerId: farmer.id,
      farmerName: farmer.fullName,
      pssId: farmer.pssId,
      center,
      scheme,
      season,
      commodity,
      lotId,
      lotRefNumber: lotRef || `LOT-${rowIndex}`,
      billNumber: billNo,
      applicationId: appId,
      packageType,
      lotCreatedDate,
      lotModifiedDate,
      lotCreatedBy,
      mobileNo,
      nomineeName: nominee,
      procuredFrom,
      sellerTmId,
      noOfBags,
      quantity,
      actualQuantity,
      price,
      tradeValue,
      lotStatus,
      dispatchStatus,
      isDocGenerated,
      qrScannedStatus,
      assayingParams,
      assayingParamsValues,
      parsedAssaying,
      remark,
    };

    lotsList.push(lot);
  }

  const farmersArray = Array.from(farmerMap.values());

  const validationResult: CsvValidationResult = {
    totalRows: rows.length - 1,
    validRows: lotsList.length,
    invalidRows: errors.length,
    duplicateRows,
    importedFarmersCount: farmersArray.length,
    importedLotsCount: lotsList.length,
    errors,
    previewFarmers: farmersArray.slice(0, 5),
    previewLots: lotsList.slice(0, 5),
  };

  return {
    farmers: farmersArray,
    lots: lotsList,
    validation: validationResult,
  };
}
