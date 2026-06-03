export type ActiveScreen = 'HOME' | 'PROJECTS' | 'TIMELINE' | 'ARCHIVE' | 'CONTACT';

export interface ProjectMetadata {
  threatLevel: string;
  signalTelemetryTitle: string;
  containmentProtocol: string;
}

export interface Project {
  id: string;
  name: string;
  description: string;
  fullDossier: string;
  category: string;
  caseFileNumber: string;
  date: string;
  imgUrl: string;
  tags: string[];
  metadata: ProjectMetadata;
  liveUrl?: string;
  sourceUrl?: string;
}

export interface TimelineEvent {
  year: string;
  title: string;
  label: string;
  description: string;
  isClassified: boolean;
  clearanceLevelRequired?: string | number;
  category?: string;
}

export interface UserBadge {
  codename: string;
  specialPower: string;
  clearanceLevel: number;
  assignedDepartment: string;
  commsAppliance: string;
  joinedDate: string;
}

export interface TimelineEntry {
  id: string;
  fileCode: string;
  yearRange: string;
  title: string;
  department: string;
  description: string;
  tags: string[];
  confidentialLog: string;
  iconType: 'dangerous' | 'memory' | 'psychology';
  imageUrl: string;
  imageAlt: string;
}

export interface SecurityPass {
  name: string;
  specialization: string;
  clearanceLevel: string;
  issuedAt: string;
  barcode: string;
  codeWord: string;
  avatarSeed: number;
}

export interface RadarTarget {
  id: string;
  angle: number;
  distance: number;
  size: number;
  intensity: number;
  detectedAt: string;
  type: string;
  coordinates: string;
}


