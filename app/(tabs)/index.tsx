import { icons } from "@/constants/icons";
import { images } from "@/constants/images";
import { fetchPopularMovies } from "@/service/api";
import useFetch from "@/service/usefetch";
import { useRouter } from "expo-router";
import {
  ActivityIndicator,
  FlatList,
  Image,
  ScrollView,
  Text,
  View,
} from "react-native";

export default function Index() {
  const router = useRouter();
  const {
    data: movies,
    loading: moviesLoading,
    error: moviesError,
  } = useFetch(() => fetchPopularMovies({ query: "" }));

  return (
    <ScrollView className="flex-1 bg-primary">
      <Image source={images.bg} className="absolute w-full z-0" />
      <View className="flex-1 px-5">
        <Image source={icons.logo} className="w-12 h-10 mt-20 mb-5 mx-auto" />

        {/* <SearchBar
          onPress={() => router.push("/search")}
          placeholder="Search for a Movie"
          value={""}
          onChangeText={function (text: string): void {
            throw new Error("Function not implemented.");
          }}
        /> */}
        <Text className="text-lg text-white font-bold mt-5 mb-3">
          Latest Movies
        </Text>

        {moviesLoading ? (
          <ActivityIndicator
            size="large"
            color="#000fff"
            className="mt-10 self-center"
          />
        ) : moviesError ? (
          <Text className="text-white mt-10 text-center">
            Error: {moviesError?.message}
          </Text>
        ) : (
          <View className="flex-1 mt-5">
            <FlatList
              data={movies}
              keyExtractor={(item) => item.id.toString()}
              renderItem={({ item }) => (
                <Text className="text-white text-sm">{item.title}</Text>
                // <MovieCard {...item} />
              )}
              numColumns={3}
              columnWrapperStyle={{
                justifyContent: "flex-start",
                gap: 20,
                paddingRight: 5,
                marginBottom: 10,
              }}
              className="mt-2 pb-32"
              scrollEnabled={false}
            />
          </View>
        )}
      </View>
    </ScrollView>
  );
}