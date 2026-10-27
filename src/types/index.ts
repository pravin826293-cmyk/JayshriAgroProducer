export type Language = 'en' | 'mr';

export interface MasterFarmer {
  id: string;
  pssId: string;
  fullName: string;
  aadhaarRef: string; // Masked for privacy (e.g. XXXXXXXX4045 or reference ID)
  mobileNumber: string;
  center: string;
  village?: string;
  taluka?: string;
  district?: string;
  nomineeName: string;
  procuredFrom: string;
  sellerTmId: string;
  totalLotsCount: number;
  totalQuantityQtl: number;
  totalBags: number;
  totalTradeValue: number;
  status: 'Active' | 'Inactive' | 'Archived';
  category?: 'Small Farmer' | 'Marginal Farmer' | 'Large Farmer' | 'General';
  bankName?: string;
  ifscCode?: string;
  createdAt: string;
  updatedAt: string;
}

export interface AssayingParameter {
  name: string;
  value: string;
}

export interface ProcurementLot {
  id: string;
  farmerId: string;
  farmerName: string;
  pssId: string;
  center: string;
  scheme: string;
  season: string;
  commodity: string;
  lotId: string;
  lotRefNumber: string;
  billNumber: string;
  applicationId: string;
  packageType: string;
  lotCreatedDate: string;
  lotModifiedDate: string;
  lotCreatedBy: string;
  mobileNo: string;
  nomineeName: string;
  procuredFrom: string;
  sellerTmId: string;
  noOfBags: number;
  quantity: number;
  actualQuantity: number;
  price: number;
  tradeValue: number;
  lotStatus: 'Completed' | 'Pending' | 'Reversed Entry' | string;
  dispatchStatus: 'Confirmed Dispatch' | 'Rejected Dispatch' | 'Pending Dispatch' | string;
  isDocGenerated: string;
  qrScannedStatus: string;
  assayingParams: string;
  assayingParamsValues: string;
  parsedAssaying?: AssayingParameter[];
  remark: string;
  approvedRejectedBy?: string;
  approvedRejectedDate?: string;
}

export interface CompanyScheme {
  id: string;
  title: string;
  titleMr: string;
  category: 'Seeds & Inputs' | 'Procurement & Storage' | 'Machinery Rental' | 'Farmer Subsidies' | 'Soil & Water Testing' | 'Organic Certification';
  categoryMr: string;
  shortDesc: string;
  shortDescMr: string;
  fullDesc: string;
  fullDescMr: string;
  benefits: string[];
  benefitsMr: string[];
  eligibility: string[];
  eligibilityMr: string[];
  requiredDocuments: string[];
  applicationProcedure: string;
  startDate: string;
  endDate: string;
  status: 'Published' | 'Draft' | 'Expired' | 'Archived';
  isFeatured: boolean;
  contactInfo?: string;
  applicationLink?: string;
}

export interface GovtScheme {
  id: string;
  name: string;
  nameMr: string;
  department: string;
  departmentMr: string;
  category: 'Agricultural Machinery' | 'Irrigation & Micro-Irrigation' | 'Horticulture & Planting' | 'Crop Protection & Inputs' | 'Financial & Insurance' | 'Infrastructure & Warehousing';
  categoryMr: string;
  shortDesc: string;
  shortDescMr: string;
  eligibilitySummary: string;
  eligibilitySummaryMr: string;
  benefits: string;
  benefitsMr: string;
  requiredDocuments: string[];
  officialSource: string;
  officialUrl: string;
  lastVerifiedDate: string;
  status: 'Active' | 'Under Review';
}

export interface Announcement {
  id: string;
  title: string;
  titleMr: string;
  content: string;
  contentMr: string;
  category: 'Procurement' | 'Weather & Advisory' | 'Subsidies' | 'FPC Notice';
  categoryMr: string;
  priority: 'Urgent' | 'High' | 'Normal';
  publishedDate: string;
  expiryDate?: string;
  status: 'Published' | 'Draft';
  attachmentUrl?: string;
  attachmentName?: string;
}

export interface AdminUser {
  id: string;
  name: string;
  email: string;
  role: 'Super Admin' | 'Procurement Officer' | 'Field Manager';
}

export interface CsvValidationResult {
  totalRows: number;
  validRows: number;
  invalidRows: number;
  duplicateRows: number;
  importedFarmersCount: number;
  importedLotsCount: number;
  errors: { row: number; error: string; rawData?: Record<string, string> }[];
  previewFarmers: Partial<MasterFarmer>[];
  previewLots: Partial<ProcurementLot>[];
}
