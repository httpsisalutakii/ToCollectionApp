import { StyleSheet } from 'react-native';
import type { Theme } from '../../global/themes';

export const createStyles = (theme: Theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
    },
    content: {
      paddingHorizontal: 20,
      paddingTop: 50,
      paddingBottom: 32,
    },
    communityHeader: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 24,
      gap: 16,
    },
    communityLogo: {
      width: 110,
      height: 110,
      borderRadius: 24, // Bordas arredondadas quadradas iguais à foto enviada
    },
    headerInfo: {
      flex: 1,
      gap: 12,
    },
    communityTitle: {
      fontSize: 24,
      fontWeight: 'bold',
      color: '#333333',
    },
    joinButton: {
      backgroundColor: '#d1aee5', // Cor rosa chiclete idêntica ao botão do seu print
      paddingVertical: 10,
      paddingHorizontal: 16,
      borderRadius: 16,
      alignSelf: 'flex-start',
      elevation: 3,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.2,
      shadowRadius: 2,
    },
    joinButtonText: {
      color: '#8344a8ff',
      fontWeight: 'bold',
      fontSize: 14,
      textAlign: 'center',
    },
    section: {
      marginBottom: 24,
    },
    sectionTitle: {
      fontSize: 18,
      fontWeight: 'bold',
      marginBottom: 12,
      color: '#000000',
    },
    sectionText: {
      fontSize: 14,
      lineHeight: 22,
      color: '#333333',
    },
    chatCard: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 16,
      gap: 16,
    },
    iconContainer: {
      width: 80,
      height: 80,
      borderRadius: 20,
      borderWidth: 2,
      borderColor: '#000000', // Adiciona a borda preta grossa em volta dos ícones
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#ffffff',
    },
    chatIcon: {
      width: 45,
      height: 45,
      resizeMode: 'contain',
    },
    chatInfo: {
      flex: 1,
    },
    chatName: {
      fontSize: 18,
      fontWeight: 'bold',
      color: '#333333',
      marginBottom: 4,
    },
    chatDescription: {
      fontSize: 13,
      color: '#666666',
      lineHeight: 18,
    },
  });

