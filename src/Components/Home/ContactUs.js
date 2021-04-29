import React from 'react';
import {
  View,
  Text,
  Linking,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Image,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import ContactImg from '../../assests/images/contact1.png';

const {width, height} = Dimensions.get('window');

const Contact = () => {
  return (
    <LinearGradient
      locations={[0.3, 0.9, 1]}
      colors={['#FFFFFF', '#C4C4C4', '#A4A49C']}
      style={{flex: 1}}>
      <View
        style={{
          backgroundColor: '#08121C',
          height: height * 0.4,
          alignItems: 'center',
        }}>
        <Text style={styles.headerText}>Get in Touch With Us!</Text>
        <Image source={ContactImg} style={{width: 400, height: 250}} />
      </View>
      <View style={styles.wrapper}>
        <TouchableOpacity
          onPress={() => Linking.openURL(`tel: 8898819444`)}
          activeOpacity={0.7}
          style={styles.section}>
          <FontAwesome name="phone" color="#08121C" size={25} />
          <Text style={styles.text}>Call Us</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={async () => {
            Linking.openURL(
              'whatsapp://send?text=Hey there&phone=91 8898819444',
            );
          }}
          activeOpacity={0.7}
          style={styles.section}>
          <FontAwesome name="whatsapp" color="#08121C" size={25} />
          <Text style={styles.text}>WhatsApp Us</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => Linking.openURL(`mailto: local.ly2021@gmail.com`)}
          activeOpacity={0.7}
          style={styles.section}>
          <MaterialCommunityIcons name="gmail" color="#08121C" size={25} />
          <Text style={styles.text}>Email Us</Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
};

export default Contact;

const styles = StyleSheet.create({
  wrapper: {
    alignItems: 'center',
  },
  headerText: {
    fontSize: 20,
    textAlign: 'center',
    marginTop: 25,
    color: '#fff',
  },
  section: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 0.4,
    borderBottomColor: '#AAA',
    padding: 25,
    width: width * 0.9,
  },
  text: {
    fontSize: 20,
    marginLeft: 15,
  },
});
