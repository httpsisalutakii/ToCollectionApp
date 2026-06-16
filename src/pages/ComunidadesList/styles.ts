import { StyleSheet } from 'react-native';
import type { Theme } from '../../global/themes';

export const createStyles = (theme: Theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
    },
    headerTitle: {
      fontSize: 28,
      fontWeight: 'bold',
      paddingHorizontal: 24,
      paddingTop: 60,
      paddingBottom: 16,
      color: theme.colors.text,
    },
    lastViewedTitle: {
      fontSize: 20,
      fontWeight: 'bold',
      paddingHorizontal: 24,
      //paddingTop: 20,
      paddingBottom: 16,
      color: theme.colors.text,
    },
    listContent: {
      paddingHorizontal: 15, //24
      paddingBottom: 24,
      gap: 12,
    },
    card: {
      flexDirection: 'column', //row
      alignItems: 'stretch', //center
      justifyContent: 'space-between',
      backgroundColor: theme.colors.surface,
      borderRadius: 16,
      padding: 18,
      paddingTop: 16, //16
      paddingHorizontal: 25,
      marginBottom: 12,
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.1,
      shadowRadius: 3,
      overflow: 'hidden',
      elevation: 2, //2
    },
    cardLeft: {
      marginTop: 12,
      flex: 1,
      marginRight: 5, //12
    },
    cardName: {
      fontSize: 18, //18
      fontWeight: '700',
      textTransform: 'capitalize', //'capitalize'
      marginBottom: 8,
      color: theme.colors.text,
    },
    typeContainer: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: 6,
    },
    typeBadge: {
      backgroundColor: theme.colors.accent,
      borderRadius: 999,
      paddingHorizontal: 10,
      paddingVertical: 4,
    },
    typeText: {
      fontSize: 12,
      fontWeight: '700',
      textTransform: 'capitalize',
      color: '#ffffff',
    },
    cardImage: {
      borderRadius: 12,
      width: 310,
      height: 190,
      resizeMode: 'cover',
    },
    searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 24,
    marginBottom: 16,
  },
  searchWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.search || '#441515',
    paddingHorizontal: 16,
    height: 50,
    borderRadius: 25,
    flex: 1,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: theme.colors.text,
    height: '100%',
  },
  menuButton: {
    marginLeft: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
    buttonLogout: {
      position: 'absolute',
      top: 60,
      right: 24,
      backgroundColor: theme.colors.sair,
      paddingHorizontal: 12,
      paddingVertical: 6,
      borderRadius: 8,
    },
    buttonLogoutText: {
      color: theme.colors.text,
      fontSize: 14,
      fontWeight: 'bold',
    },
    actionsRow: {
      flexDirection: 'row',
      gap: 10,
      paddingHorizontal: 24,
      marginBottom: 12,
    },
    pesquisa: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#ffffff', // Cor de fundo da tela
  },
  icon: {
    width: 20,
    height: 20,
    marginRight: 10,
    resizeMode: 'contain',
  },
    actionButton: {
      flex: 1,
      height: 42,
      borderRadius: 10,
      alignItems: 'center',
      justifyContent: 'center',
    },
    favoritesButton: {
      backgroundColor: '#2563eb', // azul
    },
    actionButtonText: {
      color: '#fff',
      fontWeight: '700',
      fontSize: 13,
    },
  });