import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, ActivityIndicator, TextInput} from 'react-native';
import { createStyles } from './styles';
import { useTheme } from '../../global/themes';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../routes';
import { fetchPokemonListPage, type PokemonListItemUI } from '../../services/pokeapi';
import { getFavoriteIds, getFavoritePokemons } from '../../services/favoritesStorage';
import { getLastViewedPokemons, type LastViewedPokemon } from '../../services/lastViewedStorage';
import { Ionicons, Feather } from '@expo/vector-icons';

const PAGE_SIZE = 10;

const TYPE_COLORS: Record<string, string> = {
  normal: '#A8A77A',
  fire: '#EE8130',
  water: '#6390F0',
  electric: '#F7D02C',
  grass: '#7AC74C',
  ice: '#96D9D6',
  fighting: '#C22E28',
  poison: '#A33EA1',
  ground: '#E2BF65',
  flying: '#A98FF3',
  psychic: '#F95587',
  bug: '#A6B91A',
  rock: '#B6A136',
  ghost: '#735797',
  dragon: '#6F35FC',
  dark: '#705746',
  steel: '#B7B7CE',
  fairy: '#D685AD',
};

type PokemonListItem = {
  id: number;
  name: string;
  imageUrl: string;
  types: string[];
};

const MOCK_POKEMON_LIST: PokemonListItem[] = [
  {
    id: 1,
    name: 'Monster High Fangs',
    imageUrl: 'https://i.pinimg.com/736x/13/ea/cf/13eacf1218f462e1c7fd5966a9d3045f.jpg',
    types: ['grass', 'poison'],
  },
  {
    id: 2,
    name: 'Kpop World',
    imageUrl: 'https://i.pinimg.com/736x/c8/6c/07/c86c077739ada1cb515659c2d05492ec.jpg',
    types: ['fire'],
  },
  {
    id: 3,
    name: 'Pokemon Card',
    imageUrl: 'https://i.pinimg.com/736x/ce/78/ea/ce78eaec782c6c486585cc50cae3fc19.jpg',
    types: ['water'],
  },
];

function getTypeColor(type: string) {
  return TYPE_COLORS[type] ?? '#A8A8A8';
}

export default function PokemonListScreen() {
  const theme = useTheme();
  const styles = createStyles(theme);
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList, 'PokemonList'>>();

  const [items, setItems] = useState<PokemonListItem[]>(MOCK_POKEMON_LIST);
  const [offset, setOffset] = useState(0);
  const [hasNextPage, setHasNextPage] = useState(false);
  const [searchText, setSearchText] = useState('');

  const [isInitialLoading, setIsInitialLoading] = useState(false);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const [error, setError] = useState<string | null>(null);

  const [favoriteIds, setFavoriteIds] = useState<number[]>([]);
  const [favoriteItems, setFavoriteItems] = useState<PokemonListItemUI[]>([]);
  const [showOnlyFavorites, setShowOnlyFavorites] = useState(false);
  const [isFavoritesLoading, setIsFavoritesLoading] = useState(false);

  const [lastViewed, setLastViewed] = useState<LastViewedPokemon | null>(null);

  async function loadInitial() {
    try {
      setError(null);
      setIsInitialLoading(true);
      const page = await fetchPokemonListPage(PAGE_SIZE, 0);
      setItems(page.items);
      setOffset(PAGE_SIZE);
      setHasNextPage(Boolean(page.next));
    } catch {
      setError('Falha ao carregar a lista de Pokémon.');
    } finally {
      setIsInitialLoading(false);
    }
  }

  async function loadMore() {
    if (showOnlyFavorites || isLoadingMore || isInitialLoading || isRefreshing || !hasNextPage) return;
    try {
      setIsLoadingMore(true);
      const page = await fetchPokemonListPage(PAGE_SIZE, offset);
      setItems((prev) => [...prev, ...page.items]);
      setOffset((prev) => prev + PAGE_SIZE);
      setHasNextPage(Boolean(page.next));
    } catch {
      setError('Falha ao carregar mais Pokémon.');
    } finally {
      setIsLoadingMore(false);
    }
  }

  async function refreshList() {
    try {
      setError(null);
      setIsRefreshing(true);
      const page = await fetchPokemonListPage(PAGE_SIZE, 0);
      setItems(page.items);
      setOffset(PAGE_SIZE);
      setHasNextPage(Boolean(page.next));
    } catch {
      setError('Falha ao atualizar a lista.');
    } finally {
      setIsRefreshing(false);
    }
  }

  async function loadFavoritesFromStorage() {
    try {
      setIsFavoritesLoading(true);
      const [ids, favorites] = await Promise.all([
        getFavoriteIds(),
        getFavoritePokemons(),
      ]);
      setFavoriteIds(ids);
      setFavoriteItems(favorites.map((pokemon) => ({
        id: pokemon.id,
        name: pokemon.name,
        imageUrl: pokemon.imageUrl,
        types: pokemon.types,
      })));
    } finally {
      setIsFavoritesLoading(false);
    }
  }

  async function loadLastViewed() {
    const last = await getLastViewedPokemons();
    setLastViewed(last);
  }

  useEffect(() => {
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      loadFavoritesFromStorage();
      loadLastViewed();
    }, [])
  );

  useEffect(() => {
    if (showOnlyFavorites) {
      loadFavoritesFromStorage();
    }
  }, [showOnlyFavorites]);

  const visibleItems = showOnlyFavorites ? favoriteItems : items;

  const searchedItems = visibleItems.filter((item) =>
    item.name.toLowerCase().includes(searchText.toLowerCase())
  );

  function handleLogout() {
    navigation.reset({
      index: 0,
      routes: [{ name: "Login" }],
    })
  }
    const renderItem = ({ item }: { item: PokemonListItem }) => (
      <TouchableOpacity
        style={styles.card}
        activeOpacity={0.8}
        onPress={() => navigation.navigate('PokemonDetail', { id: item.id })}
      >
        <View style={styles.cardLeft}>
          <Text style={styles.cardName}>{item.name} {favoriteIds.includes(item.id)}</Text>
          <View style={styles.typeContainer}>
            {item.types.map((type) => (
              <View
                key={`${item.id}-${type}`}
                style={[styles.typeBadge, { backgroundColor: getTypeColor(type) }]}
              >
                <Text style={styles.typeText}>{type}</Text>
              </View>
            ))}
          </View>
        </View>
        <Image source={{ uri: item.imageUrl }} style={styles.cardImage} />
      </TouchableOpacity>
    );

    if (isInitialLoading) {
      return (
        <View style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}>
          <ActivityIndicator size="large" color={theme.colors.primary} />
          <Text style={{ marginTop: 16, color: theme.colors.text }}>Carregando lista...</Text>
        </View>
      );
    }
    if (error && !showOnlyFavorites && items.length === 0) {
      return (
        <View style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}>
          <Text style={{ color: theme.colors.text, marginBottom: 16 }}>{error}</Text>
        </View>
      );
    }

    if (showOnlyFavorites && isFavoritesLoading) {
      return (
        <View style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}>
          <ActivityIndicator size="large" color={theme.colors.primary} />
          <Text style={{ marginTop: 16, color: theme.colors.text }}>Carregando favoritos...</Text>
        </View>
      );
    }

    return (
      <View style={styles.container}>
        <Text style={styles.headerTitle}>ToCollection</Text>
        <TouchableOpacity
          style={styles.buttonLogout}
          onPress={handleLogout}
        >
          <Text style={styles.buttonLogoutText}>Sair</Text>
        </TouchableOpacity>

<View style={styles.searchContainer}>
  <View style={styles.searchWrapper}>
    <Feather 
      name="search" 
      size={20} 
      color={theme.colors.textSecondary || '#A0A0A0'} 
      style={{ marginRight: 10 }}
    />
    
    <TextInput
      style={styles.input}
      placeholder="Pesquisar..."
      placeholderTextColor={theme.colors.textSecondary || '#A0A0A0'}
      value={searchText}
      onChangeText={setSearchText}
    />
  </View>

  <TouchableOpacity style={styles.menuButton} activeOpacity={0.7}>
    <Ionicons 
      name="menu" 
      size={32} 
      color={theme.colors.accent || '#7B2CBF'} 
    />
  </TouchableOpacity>
</View>

        <FlatList
          data={visibleItems}
          keyExtractor={(item) => String(item.id)}
          renderItem={renderItem}
          contentContainerStyle={styles.listContent}
          ListEmptyComponent={
            showOnlyFavorites ? (
              <View style={{ paddingVertical: 24, alignItems: 'center' }}>
                <Text style={{ color: theme.colors.textSecondary }}>
                  Você ainda não favoritou nenhum Pokémon.
                </Text>
              </View>
            ) : null
          }
          ListFooterComponent={
            showOnlyFavorites && hasNextPage && isLoadingMore ? (
              <View style={{ paddingVertical: 16 }}>
                <ActivityIndicator color={theme.colors.primary} />
              </View>
            ) : null
          }
        />
     </View>
   );
};