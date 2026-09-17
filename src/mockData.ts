import { InspectionRecord, ComplianceRule, SystemUser, NotificationItem } from './types';

export const INITIAL_INSPECTIONS: InspectionRecord[] = [
  {
    id: '1',
    inspectionId: 'LM-10248',
    productName: 'Packaged Rice 5 kg',
    brand: 'India Gate / Classic',
    manufacturer: 'ABC Foods Pvt. Ltd.',
    category: 'Grains & Pulses',
    batchNumber: 'LOT-2026-89A',
    mrp: '₹420',
    netQuantity: '5 kg',
    date: '17 Sep 2026',
    status: 'Compliant',
    officer: 'Rajesh Kumar',
    checksPassed: 18,
    potentialIssues: 0,
    needReview: 0,
    images: [
      'https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&q=80&w=800'
    ],
    declarations: [
      { declaration: 'Manufacturer / Packer', extractedValue: 'ABC Foods Pvt. Ltd., Sec-4, Noida', confidence: 98, status: 'Passed', boundingBox: { x: 10, y: 15, w: 40, h: 10 } },
      { declaration: 'Net Quantity', extractedValue: '5 kg', confidence: 96, status: 'Passed', boundingBox: { x: 60, y: 35, w: 30, h: 12 } },
      { declaration: 'Maximum Retail Price (MRP)', extractedValue: '₹420 (Incl. of all taxes)', confidence: 99, status: 'Passed', boundingBox: { x: 15, y: 65, w: 35, h: 10 } },
      { declaration: 'Packed Date', extractedValue: '08/2026', confidence: 94, status: 'Passed', boundingBox: { x: 55, y: 70, w: 35, h: 8 } },
      { declaration: 'Consumer Care Details', extractedValue: '1800-425-9988', confidence: 91, status: 'Passed', boundingBox: { x: 20, y: 85, w: 60, h: 10 } }
    ],
    findings: []
  },
  {
    id: '2',
    inspectionId: 'LM-10247',
    productName: 'Cooking Oil 1 L',
    brand: 'Sundrop Gold',
    manufacturer: 'Sunrise Foods',
    category: 'Edible Oils',
    batchNumber: 'OIL-2026-44B',
    mrp: '₹180',
    netQuantity: '1 Litre (910g)',
    date: '17 Sep 2026',
    status: 'Potential Issue',
    officer: 'Rajesh Kumar',
    checksPassed: 16,
    potentialIssues: 2,
    needReview: 0,
    images: [
      'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?auto=format&fit=crop&q=80&w=800'
    ],
    declarations: [
      { declaration: 'Manufacturer / Packer', extractedValue: 'Sunrise Foods, Industrial Area, Indore', confidence: 97, status: 'Passed', boundingBox: { x: 12, y: 20, w: 38, h: 12 } },
      { declaration: 'Net Quantity', extractedValue: '1 Litre', confidence: 88, status: 'Review', boundingBox: { x: 58, y: 40, w: 28, h: 10 } },
      { declaration: 'Maximum Retail Price (MRP)', extractedValue: '₹180', confidence: 98, status: 'Passed', boundingBox: { x: 15, y: 60, w: 32, h: 9 } },
      { declaration: 'Consumer Care Details', extractedValue: 'Not Clearly Visible', confidence: 72, status: 'Review', boundingBox: { x: 25, y: 80, w: 50, h: 12 } }
    ],
    findings: [
      {
        id: 'F-021',
        title: 'Net Quantity Declaration',
        explanation: 'Net quantity unit declaration format requires explicit weight conversion reference under Rule 14.',
        ruleRef: 'LM-PC-Net-Qty',
        confidence: 88,
        status: 'Potential Violation',
        evidenceBox: { x: 58, y: 40, w: 28, h: 10 }
      },
      {
        id: 'F-022',
        title: 'Consumer Care Details',
        explanation: 'Helpline number font size is below 2mm minimum height.',
        ruleRef: 'LM-PC-Consumer-Care',
        confidence: 72,
        status: 'Needs Review',
        evidenceBox: { x: 25, y: 80, w: 50, h: 12 }
      }
    ]
  },
  {
    id: '3',
    inspectionId: 'LM-10246',
    productName: 'Biscuits 200 g',
    brand: 'NutriChoice Digestive',
    manufacturer: 'FreshBake Foods',
    category: 'Bakery & Snacks',
    batchNumber: 'FB-902-X',
    mrp: '₹40',
    netQuantity: '200 g',
    date: '16 Sep 2026',
    status: 'Needs Review',
    officer: 'Anita Sharma',
    checksPassed: 15,
    potentialIssues: 1,
    needReview: 2,
    images: [
      'https://images.unsplash.com/photo-1558961363-fa8fdf82db35?auto=format&fit=crop&q=80&w=800'
    ],
    declarations: [
      { declaration: 'Manufacturer / Packer', extractedValue: 'FreshBake Foods, Okhla Phase-III, Delhi', confidence: 95, status: 'Passed' },
      { declaration: 'Net Quantity', extractedValue: '200 g', confidence: 99, status: 'Passed' },
      { declaration: 'Maximum Retail Price (MRP)', extractedValue: '₹40.00', confidence: 92, status: 'Review' }
    ],
    findings: [
      {
        id: 'F-031',
        title: 'MRP Tax Inclusion Phrase',
        explanation: 'Mandatory phrase "(Inclusive of all taxes)" missing adjacent to MRP value.',
        ruleRef: 'LM-PC-MRP-Tax',
        confidence: 92,
        status: 'Needs Review'
      }
    ]
  },
  {
    id: '4',
    inspectionId: 'LM-10245',
    productName: 'Tea 500 g',
    brand: 'Nilgiri Gold Leaf',
    manufacturer: 'Nilgiri Tea Estates Ltd.',
    category: 'Beverages',
    batchNumber: 'TEA-2026-C',
    mrp: '₹310',
    netQuantity: '500 g',
    date: '16 Sep 2026',
    status: 'Compliant',
    officer: 'Rajesh Kumar',
    checksPassed: 19,
    potentialIssues: 0,
    needReview: 0,
    images: [
      'https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&q=80&w=800'
    ],
    declarations: [
      { declaration: 'Manufacturer / Packer', extractedValue: 'Nilgiri Tea Estates Ltd., Coonoor, TN', confidence: 99, status: 'Passed' },
      { declaration: 'Net Quantity', extractedValue: '500 g', confidence: 98, status: 'Passed' },
      { declaration: 'MRP', extractedValue: '₹310 (Incl. of all taxes)', confidence: 99, status: 'Passed' }
    ],
    findings: []
  },
  {
    id: '5',
    inspectionId: 'LM-10244',
    productName: 'Spices 100 g',
    brand: 'Evergreen Garam Masala',
    manufacturer: 'Evergreen Spices India',
    category: 'Spices & Condiments',
    batchNumber: 'ESP-11',
    mrp: '₹95',
    netQuantity: '100 g',
    date: '15 Sep 2026',
    status: 'Violation',
    officer: 'Vikram Singh',
    checksPassed: 12,
    potentialIssues: 3,
    needReview: 2,
    images: [
      'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&q=80&w=800'
    ],
    declarations: [
      { declaration: 'Manufacturer / Packer', extractedValue: 'Unclear address details', confidence: 60, status: 'Failed' },
      { declaration: 'Net Quantity', extractedValue: '100 g', confidence: 90, status: 'Passed' },
      { declaration: 'MRP', extractedValue: '₹95', confidence: 85, status: 'Review' }
    ],
    findings: [
      {
        id: 'F-051',
        title: 'Manufacturer Address Incomplete',
        explanation: 'Full postal address and pincode of manufacturer missing from principal display panel.',
        ruleRef: 'LM-PC-Manufacturer',
        confidence: 96,
        status: 'Potential Violation'
      }
    ]
  },
  {
    id: '6',
    inspectionId: 'LM-10243',
    productName: 'Packaged Flour 10 kg',
    brand: 'Annapurna Shuddh Chakki',
    manufacturer: 'Annapurna Agro Mills',
    category: 'Grains & Pulses',
    batchNumber: 'FLR-442',
    mrp: '₹450',
    netQuantity: '10 kg',
    date: '14 Sep 2026',
    status: 'Compliant',
    officer: 'Rajesh Kumar',
    checksPassed: 18,
    potentialIssues: 0,
    needReview: 0,
    images: [
      'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&q=80&w=800'
    ],
    declarations: [
      { declaration: 'Manufacturer / Packer', extractedValue: 'Annapurna Agro Mills, Jaipur', confidence: 98, status: 'Passed' },
      { declaration: 'Net Quantity', extractedValue: '10 kg', confidence: 99, status: 'Passed' },
      { declaration: 'MRP', extractedValue: '₹450 (Incl. taxes)', confidence: 99, status: 'Passed' }
    ],
    findings: []
  },
  {
    id: '7',
    inspectionId: 'LM-10242',
    productName: 'Detergent 1 kg',
    brand: 'CleanHome PowerWash',
    manufacturer: 'CleanHome Products India',
    category: 'Household & Cleaning',
    batchNumber: 'CHP-771',
    mrp: '₹165',
    netQuantity: '1 kg',
    date: '14 Sep 2026',
    status: 'Compliant',
    officer: 'Anita Sharma',
    checksPassed: 17,
    potentialIssues: 1,
    needReview: 0,
    images: [
      'https://images.unsplash.com/photo-1585421514284-efb74c2b69ba?auto=format&fit=crop&q=80&w=800'
    ],
    declarations: [
      { declaration: 'Manufacturer / Packer', extractedValue: 'CleanHome Products, Vadodara', confidence: 97, status: 'Passed' },
      { declaration: 'Net Quantity', extractedValue: '1 kg', confidence: 98, status: 'Passed' },
      { declaration: 'MRP', extractedValue: '₹165', confidence: 96, status: 'Passed' }
    ],
    findings: []
  },
  {
    id: '8',
    inspectionId: 'LM-10241',
    productName: 'Packaged Sugar 5 kg',
    brand: 'Madhur Pure Crystal',
    manufacturer: 'Madhur Sugars Ltd.',
    category: 'Grains & Pulses',
    batchNumber: 'MS-2026-9',
    mrp: '₹240',
    netQuantity: '5 kg',
    date: '13 Sep 2026',
    status: 'Compliant',
    officer: 'Rajesh Kumar',
    checksPassed: 18,
    potentialIssues: 0,
    needReview: 0,
    images: [
      'https://images.unsplash.com/photo-1581404917137-b4d45136894a?auto=format&fit=crop&q=80&w=800'
    ],
    declarations: [
      { declaration: 'Manufacturer / Packer', extractedValue: 'Madhur Sugars Ltd., Kolhapur', confidence: 99, status: 'Passed' },
      { declaration: 'Net Quantity', extractedValue: '5 kg', confidence: 99, status: 'Passed' },
      { declaration: 'MRP', extractedValue: '₹240 (Incl. of all taxes)', confidence: 99, status: 'Passed' }
    ],
    findings: []
  }
];

export const COMPLIANCE_RULES: ComplianceRule[] = [
  {
    id: '1',
    ruleId: 'LM-001',
    requirement: 'Manufacturer / Packer Details',
    category: 'Mandatory Declaration',
    status: 'Active',
    lastUpdated: '10 Jan 2026',
    description: 'Every pre-packaged commodity must bear the name and complete address of the manufacturer or packer or importer.',
    validationCriteria: 'Name, street address, state, and pincode must be legibly printed on the principal display panel with minimum font height proportional to package size.',
    reference: 'Legal Metrology (Packaged Commodities) Rules, 2011 - Rule 6(1)(a)'
  },
  {
    id: '2',
    ruleId: 'LM-002',
    requirement: 'Net Quantity Declaration',
    category: 'Mandatory Declaration',
    status: 'Active',
    lastUpdated: '15 Feb 2026',
    description: 'The net quantity of the commodity contained in the package shall be declared in terms of standard unit of weight, measure or number.',
    validationCriteria: 'Must be declared in Metric units (gram, kilogram, litre, millilitre, meter) with correct numerical value and unit abbreviation.',
    reference: 'Legal Metrology (Packaged Commodities) Rules, 2011 - Rule 6(1)(b) & Rule 10'
  },
  {
    id: '3',
    ruleId: 'LM-003',
    requirement: 'Maximum Retail Price (MRP)',
    category: 'Pricing & Taxes',
    status: 'Active',
    lastUpdated: '01 Mar 2026',
    description: 'Every package shall bear the retail sale price of the package in the form of MRP ₹... (Inclusive of all taxes).',
    validationCriteria: 'Must clearly state "MRP ₹" followed by price, and explicitly mention tax inclusion status.',
    reference: 'Legal Metrology (Packaged Commodities) Rules, 2011 - Rule 6(1)(e)'
  },
  {
    id: '4',
    ruleId: 'LM-004',
    requirement: 'Consumer Care Details',
    category: 'Grievance Redressal',
    status: 'Active',
    lastUpdated: '12 Jan 2026',
    description: 'Name, address, email and telephone number of the person who can be contacted for consumer complaints must be mentioned.',
    validationCriteria: 'Must include customer care phone number (toll-free or landline with STD code) and/or email address.',
    reference: 'Legal Metrology (Packaged Commodities) Rules, 2011 - Rule 6(1)(g)'
  },
  {
    id: '5',
    ruleId: 'LM-005',
    requirement: 'Month and Year of Packing / Import',
    category: 'Date Declaration',
    status: 'Active',
    lastUpdated: '20 Dec 2025',
    description: 'The month and year in which the commodity was manufactured or packed or imported must be stated.',
    validationCriteria: 'Format must be MM/YYYY or Month YYYY.',
    reference: 'Legal Metrology (Packaged Commodities) Rules, 2011 - Rule 6(1)(d)'
  },
  {
    id: '6',
    ruleId: 'LM-006',
    requirement: 'Generic Name of Commodity',
    category: 'Product Identity',
    status: 'Active',
    lastUpdated: '05 Nov 2025',
    description: 'The common or generic name of the commodity contained in the package must appear on the principal display panel.',
    validationCriteria: 'Name must accurately describe the product category without misleading branding.',
    reference: 'Legal Metrology (Packaged Commodities) Rules, 2011 - Rule 6(1)(c)'
  }
];

export const SYSTEM_USERS: SystemUser[] = [
  {
    id: 'u-1',
    name: 'Rajesh Kumar',
    role: 'Enforcement Officer',
    department: 'New Delhi Circle - Zone 4',
    status: 'Active',
    lastActive: 'Just now',
    email: 'rajesh.kumar@legalmetrology.gov.in'
  },
  {
    id: 'u-2',
    name: 'Anita Sharma',
    role: 'Enforcement Officer',
    department: 'South Delhi Inspection Unit',
    status: 'Active',
    lastActive: '10 mins ago',
    email: 'anita.sharma@legalmetrology.gov.in'
  },
  {
    id: 'u-3',
    name: 'Vikram Singh',
    role: 'Reviewer',
    department: 'HQ Compliance Directorate',
    status: 'Active',
    lastActive: '1 hour ago',
    email: 'vikram.singh@legalmetrology.gov.in'
  },
  {
    id: 'u-4',
    name: 'Dr. Meenakshi Sundaram',
    role: 'Administrator',
    department: 'Central IT & Systems',
    status: 'Active',
    lastActive: 'Yesterday',
    email: 'admin.mcc@legalmetrology.gov.in'
  }
];

export const NOTIFICATIONS: NotificationItem[] = [
  {
    id: 'n-1',
    title: 'New Inspection Assigned',
    message: 'Inspection LM-10249 for Cooking Oil batch assigned to your queue.',
    time: '15 mins ago',
    read: false,
    type: 'info'
  },
  {
    id: 'n-2',
    title: 'Compliance Alert',
    message: 'Potential labeling violation reported for Evergreen Spices (LM-10245).',
    time: '2 hours ago',
    read: false,
    type: 'alert'
  },
  {
    id: 'n-3',
    title: 'Report Approved',
    message: 'HQ Reviewer approved inspection report LM-10248.',
    time: 'Yesterday',
    read: true,
    type: 'success'
  }
];
