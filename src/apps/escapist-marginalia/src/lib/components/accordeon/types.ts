export interface AccordeonItem {
  href?: string;
  label: string;
  open?: boolean | undefined;
  items?: AccordeonItem[];
}

export type AccordeonItems = AccordeonItem[];