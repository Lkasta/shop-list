import AsyncStorage from "@react-native-async-storage/async-storage";
import { FilterStatus } from "@/types/FilterStatus";

const ITEMS_STORAGE_KEY = "@comprar:items";

export type ItemStorage = {
  id: string;
  status: FilterStatus;
  description: string;
};

async function get(): Promise<ItemStorage[]> {
  try {
    const storage = await AsyncStorage.getItem(ITEMS_STORAGE_KEY);

    return storage ? JSON.parse(storage) : [];
  } catch (error) {
    throw new Error("GET_ITEMS: " + error);
  }
}

async function getByStatus(status: FilterStatus): Promise<ItemStorage[]> {
  const items = await get();
  return items.filter((item) => item.status === status);
}

async function save(items: ItemStorage[]): Promise<void> {
  try {
    await AsyncStorage.setItem(ITEMS_STORAGE_KEY, JSON.stringify(items));
  } catch (error) {
    throw new Error("SAVE_ITEMS: " + error);
  }
}

async function add(newItem: ItemStorage): Promise<ItemStorage[]> {
  const items = await get();
  const updatedItems = [...items, newItem];

  await save(updatedItems);

  return updatedItems;
}

async function remove(id: string) {
  const items = await get();
  const updatedItems = items.filter((item) => item.id !== id);

  await save(updatedItems);
}

async function togleStatus(id: String): Promise<void> {
  const items = await get();

  const updatedItems = items.map((item) =>
    item.id === id
      ? {
          ...item,
          status:
            item.status === FilterStatus.PENDING
              ? FilterStatus.DONE
              : FilterStatus.PENDING,
        }
      : item
  );

  await save(updatedItems);
}

async function clear() {
  try {
    await AsyncStorage.removeItem(ITEMS_STORAGE_KEY);
  } catch (error) {
    console.log(error);
  }
}

export const itemsStorage = {
  get,
  add,
  clear,
  remove,
  getByStatus,
  togleStatus,
};
