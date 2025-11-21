export interface QuestionModel {
  id: number;
  text: string;
  options: {
    label: string;
    value: number; // 0=conservador  1=moderado  2=agressivo
  }[];
}
