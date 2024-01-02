// Recipes.js
import { View, Text, Pressable, Image } from 'react-native';
import React from 'react';
import MasonryList from '@react-native-seoul/masonry-list';
import { RecipeApi } from './RecipeApi';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen'
import Animated, { FadeInDown, useSharedValue, withSpring } from 'react-native-reanimated';
import Loading from './loading';
import { useNavigation } from '@react-navigation/native';


export default function Recipes({categories,meals}) {
const navigation=useNavigation()
  return (
    <View className="mx-4 space-y-2">
      <Text className="font-semibold text-neutral-600" style={{ fontSize: hp(3) }}>
        Recipes
      </Text>
      <View>{meals.length==0||categories.length==0?(<Loading className="mt-20" color="yellow" size="large"/>):(
        <MasonryList
        data={meals}
        keyExtractor={(item)=> item.idMeal}
        numColumns={2}
        showsVerticalScrollIndicator={false}
        renderItem={({item,i}) => <RecipeCard item={item} index={i} navigation={navigation}/>}
        onEndReachedThreshold={0.1}
        />
      )}
      </View>
    </View>
  );
}

const RecipeCard = ({ item, index,navigation }) => {
    let isEven=index%2==0
  return (
    <Animated.View entering={FadeInDown.delay(index*100).duration(300).springify().damping(12)}>
        <Pressable style={{width:"100%", paddingLeft:isEven?0:8,paddingRight:isEven?8:0}} className="flex justify-center mb-4 space-y-1" onPress={()=>navigation.navigate("Recipe",{...item})}>
            <Animated.Image source={{uri:`${item.strMealThumb}`}} style={{width:"100%",height:index%3==0?hp(25):hp(35),borderRadius:35}} sharedTransitionTag={item.strMeal} className="bg-black/5"/>
            <Text className="font-semibold ml-2 text-neutral-600">{item.strMeal.length>20?item.strMeal.slice(0,20)+"...":item.strMeal}</Text>
        </Pressable>
        
    </Animated.View>
  );
};
