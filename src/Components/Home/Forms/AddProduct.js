import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import {connect} from 'react-redux';
import LinearGradient from 'react-native-linear-gradient';
import {MyTextInput} from '../../../utils/myElements';
import {utilStyles} from '../../../utils/styles';
import {authLoadingAction} from '../../../Redux/Actions/authAction';
import {addProductToInventoryDispatch} from '../../../Redux/Actions/shopAction';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {bindActionCreators} from 'redux';
import {showFlashMessage} from '../../../utils/utils';
import Loader from '../../Custom/Loader';
import Ionicon from 'react-native-vector-icons/Ionicons';

const {width, height} = Dimensions.get('window');

const AddProduct = ({
  navigation,
  auth,
  shop,
  addProductToInventoryDispatch,
  authLoadingAction,
}) => {
  const [productName, setProductName] = useState('');
  const [price, setPrice] = useState('');
  const [inStock, setInStock] = useState(false);

  const {
    shopData: {_id},
  } = shop;

  const {authLoading} = auth;

  const makeStateEmpty = () => {
    setProductName('');
    setPrice('');
    setInStock(false);
  };

  const onSubmit = () => {
    if (productName.length === 0 || price.length === 0) {
      showFlashMessage('Required fields are empty', 'danger');
    } else if (productName.length < 5) {
      showFlashMessage('Product name is small', 'danger');
    } else {
      let data = {shopId: _id, productName, price, inStock};
      authLoadingAction(true);
      addProductToInventoryDispatch(data);
      makeStateEmpty();
    }
  };

  return (
    <LinearGradient
      locations={[0.3, 0.9, 1]}
      colors={['#FFFFFF', '#C4C4C4', '#A4A49C']}
      style={styles.container}>
      <AntDesign
        name="left"
        size={22}
        color="#000000"
        onPress={() => navigation.goBack()}
        style={{position: 'absolute', top: 20, left: 20}}
      />
      <Text style={{fontSize: 20, marginBottom: 25}}>Add A New Product</Text>
      <MyTextInput
        value={productName}
        style={{width: width * 0.8}}
        onChangeText={(text) => setProductName(text)}
        placeholder="Enter Product Name*"
      />
      <MyTextInput
        value={price}
        style={{width: width * 0.8}}
        onChangeText={(text) => setPrice(text)}
        placeholder="Enter Product Price*"
        keyboardType="number-pad"
      />
      <TouchableOpacity
        style={styles.stockInputCont}
        activeOpacity={0.7}
        onPress={() => setInStock(!inStock)}>
        {!inStock ? (
          <Ionicon name="checkbox-outline" color="#AAA" size={25} />
        ) : (
          <Ionicon name="checkbox" color="#000000" size={25} />
        )}
        <Text style={{fontSize: 20, marginLeft: 10}}>In Stock</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => onSubmit()}
        activeOpacity={0.75}
        style={[utilStyles.button1, {marginTop: 30}]}>
        <Text style={{fontSize: 17, color: '#FFF'}}>Add</Text>
      </TouchableOpacity>
      {authLoading && <Loader />}
    </LinearGradient>
  );
};

const mapStateToProps = ({shop, auth}) => ({shop, auth});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      addProductToInventoryDispatch,
      authLoadingAction,
    },
    dispatch,
  );

export default connect(mapStateToProps, mapDispatchToProps)(AddProduct);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  stockInputCont: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
    alignSelf: 'flex-start',
    marginLeft: 45,
  },
  arrowCont: {
    flexDirection: 'column',
    alignItems: 'center',
    marginLeft: 20,
  },
  upBtn: {
    width: 30,
    height: 30,
    backgroundColor: '#000000',
    elevation: 6,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  downBtn: {
    width: 30,
    height: 30,
    backgroundColor: '#000000',
    elevation: 6,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    marginTop: 7,
  },
});
