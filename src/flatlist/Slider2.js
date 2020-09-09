import React, {useState, useEffect} from 'react';
import { Text, View, StyleSheet, SafeAreaView, FlatList, Dimensions } from 'react-native';
import ListItem from './ListItem';
import { fetchImages } from '../redux/actions/actions';
import { connect } from 'react-redux';

let page = 0
const offset = 20
let onEndReachedCalledDuringMomentum = false

const Slider2 = (props) => {
  const [name, setName] = useState('posts')
  const [images, setImages] = useState([])
  
  const handleLoadMore = () => {
    let ar = props.imageList.slice (0, offset*(1+page))
    let data = ar.map(i=> ({id: i.id, image: 'https://picsum.photos/200/300?image='+i.id, author: i.author}))
    setImages(data)
    page += 1
  }
  useEffect(() => {
    props.fetchImages()
  }, [])

  if (page == 0 && props.imageList.length > 0) handleLoadMore()

  const itemWidth = Math.round(Dimensions.get('window').width);
  const totalItemHeight = 230 + 10;
  

  console.log('childComp', images.length, props.imageList)
  return (
    <View style={{flex:1}}>
      <SafeAreaView style={styles.container}>
        <View style={styles.subcontainer}>
          {images.length === 0 && <Text style={styles.titleText}>Loading ...</Text>}
          {images.length !== 0 && <FlatList
            pagingEnabled={true}
            data={images}
            renderItem={({item, index}) =>
              <ListItem 
                style={{width: itemWidth}}
                item={item}
                imageKey='image'
                // index={(index+1)+((page-1)*offset)}
                index={(index+1)}
                active={index === 0}
                local={false}
                height={230}
                onPress={()=> {alert('Image '+JSON.stringify(item))}}
              />
            
            }
            ItemSeparatorComponent={() => (
              <View style={{height: 10}} />
            )}
            keyExtractor={(item, index) => index+'new'+index}
            // onViewableItemsChanged={this.onViewableItemsChanged}
            // viewabilityConfig={this.viewabilityConfig}
            getItemLayout={(data, index) => ({
              length: totalItemHeight,
              offset: totalItemHeight * index,
              index,
            })}
            windowSize={1}
            initialNumToRender={10}
            maxToRenderPerBatch={10}
            removeClippedSubviews={true}
            onEndReachedThreshold={0.1}
            onEndReached={() => {
              if (!onEndReachedCalledDuringMomentum) {
                handleLoadMore()
                onEndReachedCalledDuringMomentum = true
              }
            }}
            onMomentumScrollBegin={() => onEndReachedCalledDuringMomentum = false}
          />}
        </View>
      </SafeAreaView>
    </View>
    
  )
}


const mapStateToProps = (state) => (
  { imageList: state.imageReducer.imageList }
)

const mapDispatchToProps = (dispatch) => (
  { fetchImages: () => dispatch(fetchImages())}
)
export default connect(mapStateToProps, mapDispatchToProps)(Slider2);


const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  subcontainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  
  titleText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});