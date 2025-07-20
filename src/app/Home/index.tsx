import { View, Image, TouchableOpacity, Text, FlatList } from "react-native";

import { Button } from "@/Components/Button";
import { Input } from "@/Components/Input";

import { styles } from "./styles";
import { FilterStatus } from "@/types/FilterStatus";
import { Filter } from "@/Components/Filters";
import { Item } from "@/Components/Item";

const FILTER_STATUS: FilterStatus[] = [FilterStatus.DONE, FilterStatus.PENDING];
const Items = [
  {
    id: "1",
    status: FilterStatus.DONE,
    description: "1kg de Jonas",
  },
  {
    id: "2",
    status: FilterStatus.PENDING,
    description: "Agora 2kg de Jonas skskksksksks",
  },
];

export function Home() {
  return (
    <View style={styles.container}>
      <Image style={styles.logo} source={require("@/assets/logo.png")} />

      <View style={styles.form}>
        <Input placeholder="O que você quer comprar?" />
        <Button title="Adicionar" />
      </View>

      <View style={styles.content}>
        <View style={styles.header}>
          {FILTER_STATUS.map((status) => {
            return <Filter key={status} status={status} isActive />;
          })}

          <TouchableOpacity style={styles.clearButton} activeOpacity={0.8}>
            <Text style={styles.clearText}>Limpar</Text>
          </TouchableOpacity>
        </View>

        <FlatList
          data={Items}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
          contentContainerStyle={styles.listContent}
          renderItem={({ item }) => (
            <Item
              data={item}
              onRemove={() => console.log("Remove Jonas")}
              handleStatus={() => console.log("Muda Status")}
            />
          )}
          ListEmptyComponent={() => (
            <Text style={styles.emptyList}>Nenhum item cadastrado.</Text>
          )}
        />
      </View>
    </View>
  );
}
