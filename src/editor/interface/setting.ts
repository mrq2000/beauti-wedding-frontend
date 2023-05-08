export interface FontSetting {
  fontSize: number;
  fontFamily: string;
  fontWeight: string;
  color: string;
  textAlign: 'left' | 'right' | 'center' | 'justify';
  fontStyle: string;
}

export interface Spacing {
  top: number;
  left: number;
  bottom: number;
  right: number;
}

export interface Border {
  borderWidth: number;
  borderColor: string;
  borderStyle: string;
}
