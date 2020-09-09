import React, {useState, useEffect, Children} from 'react';
import { Text, View, StyleSheet, SafeAreaView, FlatList, Dimensions } from 'react-native';
import Axios from 'axios';
import ListItem from './ListItem';

let allImages = []
let page = 0
const offset = 20
let onEndReachedCalledDuringMomentum = false

const Slider = (props) => {
  const [name, setName] = useState('posts')
  const [images, setImages] = useState([])
  
  const handleLoadMore = () => {

    console.log('handleLoadMore', page+1)
    let ar = allImages.slice (0, offset*(1+page))
    let data = ar.map(i=> ({id: i.id, image: 'https://picsum.photos/200/300?image='+i.id, author: i.author}))
    console.log('images', data)
    setImages(data)
    page += 1
  }
  const fetchImages = () => {
    Axios.get("https://picsum.photos/list").then(res => {
      allImages = res.data
      handleLoadMore()
      // let ar = allImages.slice (page*offset, offset*(1+page))
      // let data = ar.map(i=> ({id: i.id, image: 'https://picsum.photos/200/300?image='+i.id, author: i.author}))
      // console.log('images', data)
      // setImages(data)
    })
  }
 
  useEffect(fetchImages, [])

  const childComp = <ListItem/>
  const itemWidth = Math.round(Dimensions.get('window').width);
  const totalItemHeight = 230 + 10;
  

  console.log('childComp', images.length)
  return (
    <View style={{flex:1}}>
      <SafeAreaView style={styles.container}>
        <View style={styles.subcontainer}>
          {images.length === 0 && <Text style={styles.titleText}>Loading ...</Text>}
          {images.length !== 0 && <FlatList
            pagingEnabled={true}
            data={images}
            renderItem={({item, index}) =>
              // React.cloneElement(childComp, {
              //   style: {width: Math.round(Dimensions.get('window').width)},
              //   item: item,
              //   imageKey: 'image',
              //   index: index,
              //   active: index === 0,
              //   local: false,
              //   height: 230,
              // })
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

export default Slider;


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