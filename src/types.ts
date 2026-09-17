export type ScreenId =
  | 'login'
  | 'dashboard'
  | 'new_inspection'
  | 'analysis'
  | 'findings'
  | 'evidence_viewer'
  | 'history'
  | 'product_details'
  | 'report_preview'
  | 'rules'
  | 'users'
  | 'settings';

export type InspectionStatus = 'Compliant' | 'Potential Issue' | 'Needs Review' | 'Violation';

export interface InspectionRecord {
  id: string;
  inspectionId: string;
  productName: string;
  brand: string;
  manufacturer: string;
  category: string;
  batchNumber: string;
  mrp: string;
  netQuantity: string;
  date: string;
  status: InspectionStatus;
  officer: string;
  checksPassed: number;
  potentialIssues: number;
  needReview: number;
  images: string[];
  declarations: {
    declaration: string;
    extractedValue: string;
    confidence: number;
    status: 'Passed' | 'Review' | 'Failed';
    boundingBox?: { x: number; y: number; w: number; h: number };
  }[];
  findings: {
    id: string;
    title: string;
    explanation: string;
    ruleRef: string;
    confidence: number;
    status: 'Needs Review' | 'Potential Violation' | 'Verified';
    evidenceBox?: { x: number; y: number; w: number; h: number };
  }[];
  notes?: string;
}

export interface ComplianceRule {
  id: string;
  ruleId: string;
  requirement: string;
  category: string;
  status: 'Active' | 'Under Revision' | 'Deprecated';
  lastUpdated: string;
  description: string;
  validationCriteria: string;
  reference: string;
}

export interface SystemUser {
  id: string;
  name: string;
  role: 'Enforcement Officer' | 'Reviewer' | 'Administrator';
  department: string;
  status: 'Active' | 'Inactive';
  lastActive: string;
  email: string;
}

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  time: string;
  read: boolean;
  type: 'alert' | 'info' | 'success';
}
