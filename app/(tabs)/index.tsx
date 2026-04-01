import { Text, View, Image, ScrollView, ActivityIndicator } from "react-native";
import { Link, useRouter } from "expo-router";
import { images } from "@/constants/images";
import { icons } from "@/constants/icons";
import SearchBar from "@/components/SearchBar";
import useFetch from "@/service/usefetch";
import { fetchMovies } from "@/service/api";

export default function Index() {
  const router = useRouter();

  const {
    data: movies,
    loading: moviesLoading,
    error: moviesError,
  } = useFetch(() =>
    fetchMovies({
      query: "",
    })
  );

  return (
    <View className="flex-1 bg-primary">
      <Image source={images.bg} className="absolute w-full z-0" />

      <ScrollView
        className="flex-1 px-5"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          minHeight: "100%",
          paddingBottom: 10,
        }}
      >
        <Image
          source={icons.logo}
          className="w-12 h-20 mt-10 mb-5 mx-auto"
        />

        {moviesLoading ? (
          <ActivityIndicator
            size="large"
            color="#0000ff"
            style={{ marginTop: 10, alignSelf: "center" }}
          />
        ) : moviesError ? (
          <Text style={{ color: "white" }}>
            Error: {moviesError?.message}
          </Text>
        ) : null}

        <Text className="text-white text-4xl font-bold text-center">
          Welcome back{" "}
          <Text className="text-secondary">Pawan Sai</Text>
        </Text>

        <Text className="text-white text-center mt-2 mb-10">
          do you need to watch movies? you are in the right place!
        </Text>

        <View className="flex-1 mt-5">
          <SearchBar
            onPress={() => router.push("/search")}
            placeholder="Search for meals"
          />
        </View>
      </ScrollView>
    </View>
  );
}