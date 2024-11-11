import { StyleSheet, Text, View } from 'react-native'
import App from '../components/App'
import Toast from 'react-native-toast-message';

const index = () => {
  return (
    <>
      <App />
      <Toast />
    </>
  )
}

export default index

const styles = StyleSheet.create({})