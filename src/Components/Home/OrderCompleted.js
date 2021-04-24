import React, {useState, useEffect, createRef, useRef} from 'react';
import {
  View,
  Text,
  Dimensions,
  StyleSheet,
  Image,
  TouchableOpacity,
} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';
import ActionSheet from 'react-native-actions-sheet';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {getCompletedOrderDataDispatch} from '../../Redux/Actions/orderAction';
import LottieView from 'lottie-react-native';
import LinearGradient from 'react-native-linear-gradient';
import dayjs from 'dayjs';
import NoDataImg from '../../assests/images/no-data1.png';
import UnverifiedImg from '../../assests/images/unverified.png';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';

const {height, width} = Dimensions.get('screen');

const actionSheetRef = createRef();

const OrderCompleted = ({shop, order, getCompletedOrderDataDispatch}) => {
  const [items, setItems] = useState([]);
  const [totalAmount, setTotalAmount] = useState(null);
  const flatlistRef = useRef(null);

  useEffect(() => {
    getCompletedOrderDataDispatch(shop.shopData._id);
  }, []);

  const {completedOrders} = order;

  // console.log('completedOrders', completedOrders);

  const renderOrderList = ({item}) => (
    <View style={styles.listCont}>
      <TouchableOpacity
        onPress={() => {
          setItems(item.items);
          setTotalAmount(item.totalAmount);
          actionSheetRef.current?.setModalVisible();
        }}
        activeOpacity={0.7}
        style={{position: 'absolute', right: 10, top: 25, zIndex: 999}}>
        <MaterialIcon name="open-in-new" color="#000000" size={22} />
      </TouchableOpacity>
      <Text style={{fontSize: 15, marginBottom: 10}}>
        Customer Name: {item.customerDetails.name}
      </Text>
      <Text style={{marginBottom: 10}}>
        Order Total: &#8377;{item.totalAmount}{' '}
      </Text>
      <Text style={{marginBottom: 10}}>Order id: {item._id} </Text>
      {item.upiPaid && (
        <View style={styles.upi}>
          <Text style={styles.upiText}>Upi Paid</Text>
        </View>
      )}
      <Text
        style={{position: 'absolute', right: 10, bottom: 5, color: '#AAAAAA'}}>
        {dayjs(item.createdAt).format('MMM D, YYYY h:mm A')}{' '}
      </Text>
      <View
        style={[
          styles.ribbon,
          {backgroundColor: item.cancelled ? '#FC2424' : '#11C866' },
        ]}>
        {item.cancelled ? (
          <Text style={styles.ribbonText}>Cancelled</Text>
        ) : (
          <Text style={styles.ribbonText}>Completed</Text>
        )}
      </View>
    </View>
  );

  const renderItemList = ({item}) => (
    <View style={styles.orderItemCont}>
      <Text style={styles.orderItemText}>Name: {item.productName} </Text>
      <Text style={styles.orderItemText}>MRP: &#8377;{item.MRP} </Text>
      <Text style={styles.orderItemText}>Quantity:{item.quantity} </Text>
    </View>
  );

  return (
    <LinearGradient
      locations={[0.3, 0.9, 1]}
      colors={['#FFFFFF', '#C4C4C4', '#A4A49C']}
      style={styles.container}>
      {completedOrders ? (
        shop.shopData.verified ? (
          completedOrders.length > 0 ? (
            <View style={{alignItems: 'center', marginTop: 30}}>
              <FlatList
                data={completedOrders}
                keyExtractor={(item) => item._id}
                renderItem={renderOrderList}
              />
              <ActionSheet
                ref={actionSheetRef}
                gestureEnabled
                initialOffsetFromBottom={0.8}
                indicatorColor="#000">
                <View style={{height: height * 0.8}}>
                  <Text
                    style={{
                      marginLeft: 40,
                      fontSize: 20,
                      fontWeight: '800',
                      marginVertical: 20,
                    }}>
                    Order Total: &#8377;{totalAmount}
                  </Text>
                  <FlatList
                    data={items}
                    keyExtractor={(item) => item.productName}
                    renderItem={renderItemList}
                    ref={flatlistRef}
                    nestedScrollEnabled
                    onScrollEndDrag={() =>
                      actionSheetRef.current?.handleChildScrollEnd()
                    }
                    onScrollAnimationEnd={() =>
                      actionSheetRef.current?.handleChildScrollEnd()
                    }
                    onMomentumScrollEnd={() =>
                      actionSheetRef.current?.handleChildScrollEnd()
                    }
                  />
                </View>
              </ActionSheet>
            </View>
          ) : (
            <View
              style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
              <Image source={NoDataImg} style={styles.img} />
              <Text style={{fontSize: 18}}>No orders found!</Text>
            </View>
          )
        ) : (
          <View
            style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <Text style={{fontSize: 16}}>Submit Shop Documents</Text>
            <Text style={{fontSize: 16}}>To Be Able To Recieve Orders</Text>
            <Image source={UnverifiedImg} style={styles.img} />
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
          <Text style={{fontSize: 16}}>We are getting your orders...</Text>
        </View>
      )}
    </LinearGradient>
  );
};

const mapStateToProps = ({shop, order}) => ({shop, order});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      getCompletedOrderDataDispatch,
    },
    dispatch,
  );

export default connect(mapStateToProps, mapDispatchToProps)(OrderCompleted);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  listCont: {
    width: width * 0.9,
    padding: 20,
    borderRadius: 8,
    elevation: 10,
    backgroundColor: '#FFFFFF',
    marginBottom: 25,
  },
  orderItemCont: {
    alignSelf: 'center',
    width: width * 0.9,
    borderBottomColor: '#000',
    borderBottomWidth: 0.5,
    marginVertical: 10,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    padding: 15,
  },
  upi: {
    width: 70,
    backgroundColor: '#08121C',
    height: 20,
    borderRadius: 3,
  },
  upiText: {
    textAlign: 'center',
    fontSize: 12,
    color: '#FFF',
    fontWeight: 'bold',
  },
  ribbon: {
    position: 'absolute',
    right: 0,
    top: 0,
    zIndex: -999,
    height: 20,
    width: 80,
    borderTopRightRadius: 3,
    borderBottomLeftRadius: 3,
  },
  ribbonText: {
    textAlign: 'center',
    fontSize: 12,
    color: '#FFF',
  },
  orderItemText: {
    fontSize: 15,
    marginVertical: 5,
  },
  sheetTotalAmt: {
    marginLeft: 40,
    fontSize: 20,
    fontWeight: '800',
    marginVertical: 20,
  },
  img: {
    width: 250,
    height: 250
  }
});
