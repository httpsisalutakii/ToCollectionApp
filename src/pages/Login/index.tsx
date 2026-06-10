import React, { useState } from 'react';
import { View, 
         Text, 
         Image, 
         TextInput, 
         TouchableOpacity, 
         ActivityIndicator,
         Modal,
         Pressable,} from 'react-native';
import Logo from '../../assets/logocorreta.png';
import { createStyles } from './styles';
import { useTheme } from '../../global/themes';
import { validateCredentials, createUser} from '../../services/authSqlite';
import { useAuth } from '../../context/AuthContext';

export default function LoginScreen() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [newUsername, setNewUsername] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [modalError, setModalError] = useState('');
  const [isCreating, setIsCreating] = useState(false);

  const theme = useTheme();
  const styles = createStyles(theme);
  const { signIn } = useAuth();

  const handleLogin = async () => {
  setIsLoading(true);
  setErrorMessage('');


  try {
    console.log("Tentando validar credenciais para o usuário:", username);
    
    const isValid = await validateCredentials(username, password);
    
    console.log("Resultado da validação:", isValid);

    if (!isValid) {
      setErrorMessage('Usuário ou senha inválidos');
      setPassword('');
      return;
    }

    signIn();
  } catch (error) {/*  */
    // ESTA LINHA VAI MOSTRAR O BUG REAL NO TERMINAL DO VS CODE
    console.error("ERRO CRÍTICO NO BANCO DE DADOS:", error);
    
    setErrorMessage('Ocorreu um erro ao consultar o banco');
  } finally {
    setIsLoading(false);
  }
};

  const handleCreateAccount = () => {
    setModalError('');
    setIsCreating(true);

    try {
      if (!newUsername.trim() || !newPassword.trim()) {
        setModalError('Preencha usuário e senha');
        return;
      }

      createUser(newUsername, newPassword);
      setModalVisible(false);
      setNewUsername('');
      setNewPassword('');
      setUsername(newUsername);
      setPassword('');
    } catch {
      setModalError('Não foi possível criar a conta');
    } finally {
      setIsCreating(false);
    }
  };

  const isButtonDisabled = isLoading || !username || !password;

  return (
    <View style={styles.container}>
      <View style={styles.boxTop}>
        <Image source={Logo} style={styles.logo} />
      </View>

      <View style={styles.boxMid}>
        <Text style={styles.titleInput}>Usuário</Text>
        <View style={styles.boxInput}>
          <TextInput
            value={username}
            onChangeText={setUsername}
            placeholder="seu_usuario"
            autoCapitalize="none"
            style={styles.textInput}
          />
        </View>
        <Text style={styles.titleInput}>Senha</Text>
        <View style={styles.boxInput}>
          <TextInput
            value={password}
            onChangeText={setPassword}
            placeholder="********"
            secureTextEntry
            style={styles.textInput}
          />
        </View>
      </View>

      <View style={styles.boxBottom}>
        <TouchableOpacity
          style={[styles.buttonEntrar, isButtonDisabled && { opacity: 0.2 }]}
          onPress={handleLogin}
          disabled={isButtonDisabled}
        >
          {isLoading ? (
            <ActivityIndicator color="#FFFFFF" />
          ) : (
            <Text style={styles.buttonEntrarText}>Entrar</Text>
          )}
        </TouchableOpacity>

        {errorMessage ? <Text style={styles.errorText}>{errorMessage}</Text> : null}

        <TouchableOpacity onPress={() => setModalVisible(true)}>
          <Text style={styles.linkCriarConta}>Criar conta</Text>
        </TouchableOpacity>
      </View>

      <Modal visible={modalVisible} transparent animationType="fade">
        <Pressable style={styles.modalOverlay} onPress={() => setModalVisible(false)}>
          <Pressable style={styles.modalBox} onPress={(e) => e.stopPropagation()}>
            <Text style={styles.modalTitle}>Nova conta</Text>
            <Text style={styles.titleInput}>Usuário</Text>
            <View style={styles.boxInput}>
              <TextInput
                value={newUsername}
                onChangeText={setNewUsername}
                placeholder="novo_usuario"
                autoCapitalize="none"
                style={styles.textInput}
              />
            </View>
            <Text style={styles.titleInput}>Senha</Text>
            <View style={styles.boxInput}>
              <TextInput
                value={newPassword}
                onChangeText={setNewPassword}
                placeholder="********"
                secureTextEntry
                style={styles.textInput}
              />
            </View>
            {modalError ? <Text style={styles.modalError}>{modalError}</Text> : null}
            <View style={styles.modalActions}>
              <TouchableOpacity style={styles.modalButton} onPress={() => setModalVisible(false)}>
                <Text style={styles.modalButtonText}>Cancelar</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.modalButtonPrimary}
                onPress={handleCreateAccount}
                disabled={isCreating}
              >
                {isCreating ? (
                  <ActivityIndicator color="#FFFFFF" />
                ) : (
                  <Text style={styles.modalButtonPrimaryText}>Criar</Text>
                )}
              </TouchableOpacity>
            </View>
          </Pressable>
        </Pressable>
      </Modal>
    </View>
  );
}