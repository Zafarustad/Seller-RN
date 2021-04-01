import React, {useEffect, createRef} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import LinearGradient from 'react-native-linear-gradient';
import {isAuthenticatedAction} from '../../Redux/Actions/authAction';
import {getShopDataDispatch} from '../../Redux/Actions/shopAction';
import SInfo from 'react-native-sensitive-info';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {axiosInstance} from '../../utils/utils';
import ShopImg from '../../assests/images/shop.png';
import ActionSheet from 'react-native-actions-sheet';
import Feather from 'react-native-vector-icons/Feather';
import AntDesign from 'react-native-vector-icons/AntDesign';
import SimpleLineIcon from 'react-native-vector-icons/SimpleLineIcons';

const {height, width} = Dimensions.get('screen');

const actionSheetRef = createRef();

const MyShop = ({
  shop,
  getShopDataDispatch,
  isAuthenticatedAction,
  navigation,
}) => {
  let actionSheet;

  const {
    shopData: {
      shopName,
      city,
      _id,
      address,
      category,
      gstin,
      pincode,
      shopOwnerId,
      shopCoordinate,
      shopReviews,
    },
  } = shop;

  useEffect(() => {
    // getShopDataDispatch(_id);
  }, []);

  const logout = async () => {
    await SInfo.deleteItem('token', {
      sharedPreferencesName: 'JwtToken',
      keychainService: 'JWT',
    });
    await AsyncStorage.clear();
    delete axiosInstance.defaults.headers.common['Authorization'];
    isAuthenticatedAction(false);
  };

  return (
    <LinearGradient
      locations={[0.3, 0.9, 1]}
      colors={['#FFFFFF', '#C4C4C4', '#A4A49C']}
      style={styles.container}>
      <View style={styles.topCont}>
        <View style={styles.topWrapper}>
          <TouchableOpacity
            onPress={() => {
              actionSheetRef.current?.setModalVisible();
            }}
            activeOpacity={0.7}
            style={{position: 'absolute', right: 20, top: 20}}>
            <SimpleLineIcon name="options-vertical" size={22} color="#FFF" />
          </TouchableOpacity>

          <View style={styles.imgCont}>
            <Image source={ShopImg} style={styles.img} />
          </View>
          <Text style={styles.shopName}>{shopName}</Text>
          <Text style={styles.category}>{category}</Text>
        </View>
      </View>
      <ScrollView style={{marginBottom: 10}}>
        <View style={styles.bottomCont}>
          <Text style={styles.text}>Address: {address}</Text>
          <Text style={styles.text}>City: {city}</Text>
          <Text style={styles.text}>Pin Code: {pincode}</Text>
          <Text style={styles.text}>GSTIN: {gstin}</Text>
        </View>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => navigation.navigate('GoogleMap', {shopCoordinate})}
          style={styles.mapBtn}>
          <Feather name="map" size={17} color="#000" style={{marginLeft: 10}} />
          <Text style={{fontSize: 17, marginLeft: 10}}>Check on map</Text>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => logout()}
          style={styles.logoutBtn}>
          <AntDesign
            name="poweroff"
            size={17}
            color="#000"
            style={{marginLeft: 10}}
          />
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
      </ScrollView>
      <ActionSheet ref={actionSheetRef} gestureEnabled indicatorColor="#000">
        <View
          style={{
            height: height * 0.4,
            alignItems: 'center',
          }}>
          <TouchableOpacity
            activeOpacity={0.5}
            onPress={() => {
              actionSheetRef.current?.setModalVisible();
              navigation.navigate('ShopDetails');
            }}
            style={styles.actionSheetBtn}>
            <AntDesign
              name="edit"
              size={17}
              color="#000"
              style={{marginLeft: 10}}
            />
            <Text style={{fontSize: 17, marginLeft: 10}}>Change Shop Info</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              actionSheetRef.current?.setModalVisible();
              navigation.navigate('GoogleMap');
            }}
            activeOpacity={0.5}
            style={styles.actionSheetBtn}>
            <AntDesign
              name="edit"
              size={17}
              color="#000"
              style={{marginLeft: 10}}
            />
            <Text style={styles.logoutText}>Change Shop Location</Text>
          </TouchableOpacity>
        </View>
      </ActionSheet>
    </LinearGradient>
  );
};

const mapStateToProps = ({shop}) => ({shop});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      getShopDataDispatch,
      isAuthenticatedAction,
    },
    dispatch,
  );

export default connect(mapStateToProps, mapDispatchToProps)(MyShop);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  topCont: {
    backgroundColor: '#08121C',
    width: width,
    height: height * 0.3,
    elevation: 10,
  },
  topWrapper: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  imgCont: {
    width: 100,
    height: 100,
    backgroundColor: '#FFF',
    borderRadius: 100,
    alignItems: 'center',
    borderColor: '#FFF',
    borderWidth: 2,
  },
  img: {
    flex: 1,
    width: '80%',
    height: '80%',
    resizeMode: 'contain',
  },
  shopName: {
    color: '#AAA',
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 10,
  },
  category: {
    color: '#FFF',
    fontSize: 15,
    marginTop: 10,
  },
  bottomCont: {
    backgroundColor: '#FFF',
    width: width,
    height: height * 0.2,
    marginTop: 20,
    elevation: 10,
    borderBottomWidth: 0.4,
    borderBottomColor: '#AAA',
  },
  text: {
    fontSize: 17,
    marginLeft: 20,
    marginTop: 10,
  },
  mapBtn: {
    backgroundColor: '#FFF',
    width: width,
    height: height * 0.08,
    elevation: 10,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 0.4,
    borderBottomColor: '#AAA',
  },
  logoutBtn: {
    backgroundColor: '#FFF',
    width: width,
    height: height * 0.08,
    // marginTop: 20,
    elevation: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  logoutText: {
    fontSize: 17,
    marginLeft: 10,
  },
  actionSheetBtn: {
    backgroundColor: '#FFF',
    width: width * 0.8,
    height: height * 0.08,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 0.4,
    borderBottomColor: '#AAA',
    marginTop: 20,
  },
});
