import {
  Tag,
  Shirt,
  Disc,
  Sticker,
  Coffee,
  GlassWater,
  CreditCard,
  Tent,
  Bath,
  Milk,
  Book,
  ShoppingBag,
} from "lucide-react";

export const CATEGORY_ICONS = [
  { name: "Tag", icon: Tag },
  { name: "Shirt", icon: Shirt },
  { name: "Disc", icon: Disc },
  { name: "Sticker", icon: Sticker },
  { name: "Coffee", icon: Coffee },
  { name: "GlassWater", icon: GlassWater },
  { name: "CreditCard", icon: CreditCard },
  { name: "Tent", icon: Tent },
  { name: "Bath", icon: Bath },
  { name: "Milk", icon: Milk },
  { name: "Book", icon: Book },
];

export const getIconByName = (name) => {
  const iconObj = CATEGORY_ICONS.find((i) => i.name === name);
  return iconObj ? iconObj.icon : ShoppingBag;
};
