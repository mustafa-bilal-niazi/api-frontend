import React, { useState, useEffect} from 'react'
import { TouchableOpacity, StyleSheet, KeyboardAvoidingView, Text, TextInput, View, Image, ScrollView, ActivityIndicator } from 'react-native'
import * as Linking from 'expo-linking';
import { StatusBar } from 'expo-status-bar';
export default function App() {

  const checkValid=()=> {
    if(Name!==''){
      sendReq()
    }
    else {
      alert('Please enter item name!')
    }
  }

  const[Name,setName]=useState('')
  const[Quantity,setQuantity]=useState('')
  const[Unit,setUnit]=useState('')
  const[dataRec,setDataRec]=useState([])
  const [isLoading, setIsLoading] = useState(false);

  const sendReq = async() => {
    setIsLoading(true);

    let url=`http://18.223.255.121/main/item?name=${Name}`
    if(Quantity!=''){
      url += `&quantity=${Quantity}`;
    }
    if(Unit!=''){
      url += `&unit=${Unit}`;
    }
    try{
      console.log(url)
      const res = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })
      const resJson = await res.json();
      if(resJson.data==0){
        alert('No results found')
      }
      setDataRec(resJson.data)
      console.log(resJson.data)
    }
    catch(error){
      alert(error.message)
      console.log(`${error}`)
    }
    setIsLoading(false);
  }

  return (
    <View style={styles.container}>
      <StatusBar hidden></StatusBar>
      <View style={{backgroundColor: 'black',width: '100%',borderBottomEndRadius: 20,borderBottomStartRadius: 20,borderBottomWidth: 3,borderBottomColor: 'white',}}>
        <Text style={{alignSelf: 'center', color: 'white', fontWeight: 'bold', fontSize: 35,}}>HARVEST</Text>
      </View>
      <View style={{width: '50%', alignSelf: 'center',marginTop: 20,}}>
        <TextInput 
          style={{backgroundColor: 'white', color: 'black',height: 50,paddingHorizontal: 10,}}
          placeholder='Name' placeholderTextColor='gray'
          value={Name}
          onChangeText={text => setName(text)}/>
      </View>
      <View style={{width: '50%', alignSelf: 'center',marginTop: 5,}} >
        <TextInput 
          style={{backgroundColor: 'white', color: 'black',height: 50,paddingHorizontal: 10,}}
          placeholder='Quantity' placeholderTextColor='gray'
          value={Quantity}
          onChangeText={text => setQuantity(text)}/>
      </View>
      <View style={{width: '50%', alignSelf: 'center',marginTop: 5,}} >
        <TextInput 
          style={{backgroundColor: 'white', color: 'black',height: 50,paddingHorizontal: 10,}}
          placeholder='Unit' placeholderTextColor='gray'
          value={Unit}
          onChangeText={text => setUnit(text)}/>
      </View>
      <TouchableOpacity
        onPress={() => checkValid()}>
        <Text style={{fontSize: 20,marginTop: 20, color: 'white', backgroundColor: 'black',paddingHorizontal: 20,paddingVertical: 8,borderRadius: 20, borderWidth: 2,borderColor: 'white'}}>
          Send
        </Text>
      </TouchableOpacity>
        <ScrollView style= {styles.container2}>
        {isLoading && <ActivityIndicator size={50} color="white" />}
          {dataRec.map((item, index) => (
          <View key={index} style={styles.item}>
            <Text style={{fontWeight: 'bold',fontSize: 17, }}>ID: {item.id} - {item.name}</Text>
            <Text >Quantity: {item.quantity}</Text>
            <Text >Unit: {item.unit}</Text>
            <Text >Price: {item.price.toFixed(2)}$</Text>
            <Text style={{color: 'blue', fontWeight: 'bold'}}
              onPress={() => Linking.openURL(`http:\\${item.website}`)}>
              Website: {item.website}
            </Text>
          </View>
          ))}
        </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'teal',
    alignItems: 'center',
    justifyContent: 'center',
  },
  container2: {
    marginTop: 35,
    bottom: 20,
    paddingHorizontal: 40,
    flex: 0.5,
  },
  item: {
    padding: 20,
    fontSize: 15,
    marginTop: 5,
    backgroundColor: 'white',
  }
});
