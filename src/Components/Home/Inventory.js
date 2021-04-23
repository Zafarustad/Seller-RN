import React, {useState, createRef, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Dimensions,
  Switch,
  TouchableOpacity,
} from 'react-native';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {
  deleteInventoryProductDispatch,
  getShopInventoryDispatch,
  toggleLoadingAction,
} from '../../Redux/Actions/shopAction';
import LinearGradient from 'react-native-linear-gradient';
import LottieView from 'lottie-react-native';
import ActionSheet from 'react-native-actions-sheet';
import Ionicon from 'react-native-vector-icons/Ionicons';
import SimpleLineIcon from 'react-native-vector-icons/SimpleLineIcons';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import Loader from '../Custom/Loader';

const {width, height} = Dimensions.get('window');

const actionSheetRef = createRef();

const Inventory = ({
  shop,
  auth,
  navigation,
  deleteInventoryProductDispatch,
  toggleLoadingAction,
  getShopInventoryDispatch,
}) => {
  const [productId, setProductId] = useState(null);

  const {
    shopData: {_id, inventory},
    dataLoading,
  } = shop;

  useEffect(() => {
    getInventoryProducts();
  }, []);

  const getInventoryProducts = () => {
    toggleLoadingAction(true);
    getShopInventoryDispatch(_id);
  };

  const deleteProduct = () => {
    if (productId) {
      toggleLoadingAction(true);
      deleteInventoryProductDispatch(_id, productId);
      actionSheetRef.current?.setModalVisible();
    }
  };

  const renderInventory = ({item}) => (
    <View style={styles.itemCont}>
      <View style={styles.row}>
        <View>
          <Text style={[styles.rowText1, {marginRight: 60}]}>Product Name</Text>
          <Text style={[styles.rowText2, {marginRight: 60}]}>
            {item.productName}
          </Text>
        </View>
        <View>
          <Text style={styles.rowText1}>MRP</Text>
          <Text style={styles.rowText2}>&#8377; {item.price}/-</Text>
        </View>
      </View>
      <View style={{marginLeft: 30}}>
        <Text style={[styles.rowText1, {marginRight: 60}]}>Stock Quantity</Text>
        <Text style={[styles.rowText2, {marginRight: 60}]}>
          {item.stockQuantity}
        </Text>
      </View>
      <View style={styles.switchWrapper}>
        <Text style={styles.swicthText}>In Stock</Text>
        <View>
          <Switch
            style={{alignSelf: 'flex-end'}}
            trackColor={{false: '#767577', true: '#06BE4A'}}
            thumbColor={'#f4f3f4'}
            ios_backgroundColor="#3e3e3e"
            onValueChange={(value) => console.log(value)}
            value={item.inStock}
          />
        </View>
      </View>
      <TouchableOpacity
        onPress={() => {
          setProductId(item._id);
          actionSheetRef.current?.setModalVisible();
        }}
        activeOpacity={0.7}
        style={styles.deleteIcon}>
        <SimpleLineIcon name="options-vertical" size={18} color="#000000" />
      </TouchableOpacity>
    </View>
  );

  return (
    <LinearGradient
      locations={[0.3, 0.9, 1]}
      colors={['#FFFFFF', '#C4C4C4', '#A4A49C']}
      style={styles.container}>
      {shop.shopData ? (
        inventory.length > 0 ? (
          <View style={{marginBottom: 70, marginTop: 20}}>
            <FlatList
              data={inventory}
              keyExtractor={(item) => item._id}
              renderItem={renderInventory}
            />
          </View>
        ) : (
          <View
            style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <Text style={{fontSize: 16}}>Your Inventory is Empty</Text>
            <Text style={{fontSize: 16}}>Start Adding Products!</Text>
          </View>
        )
      ) : (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <LottieView
            source={require('../../utils/loading.json')}
            autoPlay
            loop
            style={{width: 130, height: 130}}
          />
          <Text style={{fontSize: 16}}>Loading Inventory</Text>
        </View>
      )}
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={() => navigation.navigate('AddProduct')}
        style={styles.addBtn}>
        <Ionicon name="add" size={30} color="#FFF" />
      </TouchableOpacity>
      <ActionSheet ref={actionSheetRef} gestureEnabled indicatorColor="#000">
        <View
          style={{
            height: height * 0.4,
            alignItems: 'center',
          }}>
          <TouchableOpacity
            activeOpacity={0.5}
            onPress={() => deleteProduct()}
            style={styles.actionSheetBtn}>
            <MaterialCommunityIcon
              name="delete-circle"
              color="#DC141C"
              size={30}
              style={{marginLeft: 10}}
            />
            <Text style={{fontSize: 17, marginLeft: 10}}>Delete Product</Text>
          </TouchableOpacity>
        </View>
      </ActionSheet>
      {dataLoading && <Loader />}
    </LinearGradient>
  );
};

const mapStateToProps = ({shop, auth}) => ({shop, auth});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      deleteInventoryProductDispatch,
      toggleLoadingAction,
      getShopInventoryDispatch,
    },
    dispatch,
  );

export default connect(mapStateToProps, mapDispatchToProps)(Inventory);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerCont: {
    width: width,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    backgroundColor: '#08121C',
    justifyContent: 'center',
    alignItems: 'center',
    height: 50,
  },
  headerText: {
    color: '#FFF',
    fontSize: 18,
  },
  itemCont: {
    width: width * 0.9,
    height: 190,
    elevation: 6,
    borderRadius: 10,
    backgroundColor: '#fff',
    marginBottom: 10,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  rowText1: {
    color: '#AAA',
    fontSize: 15,
    marginTop: 15,
    fontWeight: 'bold',
  },
  rowText2: {
    color: '#000',
    fontSize: 15,
    marginTop: 3,
    marginRight: 60,
  },
  switchWrapper: {
    flexDirection: 'column',
    marginLeft: 30,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'flex-start',
    marginTop: 15,
  },
  swicthText: {
    color: '#AAA',
    fontSize: 15,
    fontWeight: 'bold',
  },
  addBtn: {
    backgroundColor: '#08121C',
    width: 60,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 40,
    right: 30,
    zIndex: 999,
    borderRadius: 70,
    elevation: 6,
  },
  deleteIcon: {
    width: 30,
    height: 20,
    position: 'absolute',
    right: 5,
    top: 20,
    zIndex: 999,
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
