import { Dimensions, StyleSheet } from 'react-native';
import type { Theme } from '../../global/themes';

export const createStyles = (theme: Theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
      alignItems: 'center',
      justifyContent: 'center',
    },
    boxTop: {
      height: Dimensions.get('window').height / 3,
      width: '100%',
      alignItems: 'center',
      justifyContent: 'center',
    },
    boxMid: {
      height: Dimensions.get('window').height / 4,
      width: '100%',
      paddingHorizontal: 37,
    },
    boxBottom: {
      height: 200,
      width: '100%',
      backgroundColor: theme.colors.background,
      alignItems: 'center',
      justifyContent: 'center',
    },
    logo: {
      height: 200,
      width: 200,
    },
    titleInput: {
      marginLeft: 5,
      color: theme.colors.textSecondary,
      marginTop: 20,
    },
    boxInput: {
      width: '100%',
      height: 40,
      borderWidth: 1,
      borderRadius: 40,
      marginTop: 10,
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: theme.colors.inputBackground,
      borderColor: theme.colors.border,
      paddingHorizontal: 15,
    },
    textInput: {
      height: '100%',
      width: '90%',
      borderRadius: 40,
      color: theme.colors.text,
    },
    buttonEntrar: {
      width: 200,
      height: 50,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: theme.colors.button,
      borderRadius: 40,
      borderWidth: 1,
      borderColor: theme.colors.primaryDark,
    },
    buttonEntrarText: {
      color: '#d1415eff',
      fontWeight: 'bold',
    },
    linkCriarConta: {
      marginTop: 16,
      fontWeight: '600',
    },
    errorText: {
      color: '#DC2626',
      marginTop: 8,
    },
    modalOverlay: {
      flex: 1,
      backgroundColor: 'rgba(0,0,0,0.4)',
      justifyContent: 'center',
      paddingHorizontal: 24,
    },
    modalBox: {
      backgroundColor: theme.colors.surface,
      borderRadius: 16,
      padding: 24,
    },
    modalTitle: {
      fontSize: 18,
      fontWeight: 'bold',
      color: theme.colors.text,
      marginBottom: 16,
    },
    modalActions: {
      flexDirection: 'row',
      justifyContent: 'flex-end',
      gap: 12,
      marginTop: 20,
    },
    modalButton: {
      paddingVertical: 10,
      paddingHorizontal: 16,
    },
    modalButtonText: {
      color: theme.colors.primary,
      fontWeight: '600',
    },
    modalButtonPrimary: {
      backgroundColor: theme.colors.primary,
      borderRadius: 8,
      paddingVertical: 10,
      paddingHorizontal: 16,
    },
    modalButtonPrimaryText: {
      color: '#b278d3',
      fontWeight: '600',
    },
    modalError: {
      color: '#DC2626',
      marginTop: 8,
    },
  });
