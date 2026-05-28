import React, { useEffect, useState } from 'react';
import { View, Text, Image, ScrollView, ActivityIndicator, TouchableOpacity, Share } from 'react-native';
import { createStyles } from './styles';
import { useTheme } from '../../global/themes';
import { useRoute, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../../routes';

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

function getTypeColor(type: string) {
  return TYPE_COLORS[type] ?? '#A8A8A8';
}

const MOCK_DETAILS_DATA: Record<number, {
  id: number;
  name: string;
  imageUrl: string;
  description: string;
}> = {
  1: {
    id: 1,
    name: 'Monster High Fangs',
    imageUrl: 'https://i.pinimg.com/736x/13/ea/cf/13eacf1218f462e1c7fd5966a9d3045f.jpg',
    description: 'A comunidade Monster High Fangs é voltada para aqueles apaixonados pelo mundo dos monstrinhos filhos das maiores referências da literatura e cinema, desde a sua primeira, segunda e terceira geração.\n\nFocada em compartilhar experiências, para quem quer comprar a sua tão sonhada boneca e também, conversar com quem compartilha dos mesmos gostos.\n\nEntre e venha fazer parte da nossa comunidade Monster High Fangs!! Beijinhos monstrinhos!! <3',
  },
  2: {
    id: 2,
    name: 'Kpop World',
    imageUrl: 'https://i.pinimg.com/736x/c8/6c/07/c86c077739ada1cb515659c2d05492ec.jpg',
    description: 'A comunidade Neon Stage é voltada para todos os fãs do universo do K-pop, acompanhando grupos de diferentes gerações, solistas, comebacks, performances e tudo que envolve a cultura coreana.\n\nFocada em compartilhar experiências, músicas favoritas, coleções de álbuns, photocards, novidades e também criar amizades com pessoas que compartilham da mesma paixão pela música e pela dança.\n\nEntre e venha fazer parte da nossa comunidade Neon Stage!! Vamos brilhar juntos nesse fandom!! ✨🎤',
  },
  3: {
    id: 3,
    name: 'Pokemon Card',
    imageUrl: 'https://i.pinimg.com/736x/ce/78/ea/ce78eaec782c6c486585cc50cae3fc19.jpg',
    description: 'A comunidade PokéCard Arena é voltada para todos os apaixonados pelo universo das cartas Pokémon, seja para colecionar, batalhar, trocar cartas ou simplesmente admirar artes incríveis das coleções.\n\nFocada em compartilhar experiências, novidades do TCG, dicas para iniciantes, trocas, pulls especiais e ajudar quem está começando ou expandindo sua coleção dos sonhos. Aqui, todo treinador encontra pessoas com a mesma paixão pelo mundo Pokémon.\n\nEntre e venha fazer parte da nossa comunidade PokéCard Arena!! Temos que pegar todos!! ⚡🃏',
  },
  4: {
    id: 4,
    name: 'Action Figures',
    imageUrl: 'https://i.pinimg.com/736x/7c/96/c2/7c96c2c1beb4dba351a673a488b7c46f.jpg',
    description: 'A comunidade de Action FIgures é voltada para todos aqueles apaixonados pelo universo das action figures, estátuas colecionáveis e personagens icônicos da cultura pop, desde animes e games até filmes e HQs.\n\nFocada em compartilhar experiências, novidades, coleções, dicas de conservação e também ajudar quem busca encontrar aquela figure dos sonhos para completar a prateleira. Aqui, você pode conversar com pessoas que compartilham da mesma paixão pelo colecionismo e pelo universo geek.\n\nEntre e venha fazer parte da nossa comunidade Action Heroes Hub!! Sua coleção merece esse espaço!! 🎮✨'
  },
  5: {
    id: 5,
    name: 'Mangá World',
    imageUrl: 'https://i.pinimg.com/736x/85/c0/bc/85c0bcdc4570d05ccaccdbd213968ce6.jpg',
    description: 'A comunidade Mangá World é voltada para todos que amam o universo dos mangás, desde os clássicos inesquecíveis até os lançamentos mais atuais que conquistam leitores ao redor do mundo.\n\nFocada em compartilhar leituras, recomendações, teorias, personagens favoritos e experiências dentro desse universo tão apaixonante. Um espaço perfeito para conversar com pessoas que vivem a mesma emoção a cada novo capítulo.\n\nEntre e venha fazer parte da nossa comunidade Mangá Sekai!! Vamos viver muitas histórias juntos!! 📖🖤' 
  },
};

export default function PokemonDetailScreen() {
  const theme = useTheme();
  const styles = createStyles(theme);
  const route = useRoute<RouteProp<RootStackParamList, 'PokemonDetail'>>();
  const { id } = route.params;
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList, 'PokemonDetail'>>();

  const [itemData, setItemData] = useState<typeof MOCK_DETAILS_DATA[number] | null>(null);

  useEffect(() => {
    // Puxa direto do banco local usando o ID recebido por parâmetro
    if (MOCK_DETAILS_DATA[id]) {
      setItemData(MOCK_DETAILS_DATA[id]);
    }
  }, [id]);

  if (!itemData) {
    return (
      <View style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}>
        <Text style={{ color: theme.colors.text }}>Item não encontrado.</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      
      {/* Topo do perfil (Foto redonda e Botão Lado a Lado) */}
      <View style={styles.communityHeader}>
        <Image source={{ uri: itemData.imageUrl }} style={styles.communityLogo} />
        <View style={styles.headerInfo}>
          <Text style={styles.communityTitle}>{itemData.name}</Text>
          <TouchableOpacity style={styles.joinButton} activeOpacity={0.8}>
            <Text style={styles.joinButtonText}>Entrar na Comunidade</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Seção Sobre */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Sobre a comunidade</Text>
        <Text style={styles.sectionText}>{itemData.description}</Text>
      </View>

      {/* Canais / Chats abaixo */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Nossos chats</Text>

        {/* Card do Chat de Vendas */}
        <TouchableOpacity style={styles.chatCard} activeOpacity={0.7}>
          <View style={styles.iconContainer}>
            <Image 
              source={{ uri: 'https://cdn-icons-png.flaticon.com/512/1170/1170576.png' }} 
              style={styles.chatIcon} 
            />
          </View>
          <View style={styles.chatInfo}>
            <Text style={styles.chatName}>Vendas</Text>
            <Text style={styles.chatDescription}>
              Grupo voltado a venda de bonecas completas e incompletas, sucatas, acessórios e etc.
            </Text>
          </View>
        </TouchableOpacity>

        {/* Card do Chat de Conversa */}
        <TouchableOpacity style={styles.chatCard} activeOpacity={0.7}>
          <View style={styles.iconContainer}>
            <Image 
              source={{ uri: 'https://cdn-icons-png.flaticon.com/512/2462/2462719.png' }} 
              style={styles.chatIcon} 
            />
          </View>
          <View style={styles.chatInfo}>
            <Text style={styles.chatName}>Chat</Text>
            <Text style={styles.chatDescription}>
              Grupo voltado para conversar sobre Monster High, preços, experiências e etc.
            </Text>
          </View>
        </TouchableOpacity>
      </View>

    </ScrollView>
  );
};