import * as React from 'react';
import { Appbar } from 'react-native-paper';
import {StyleSheet, SafeAreaView, TextInput, View, Modal, FlatList, TouchableHighlight, TouchableOpacity, Text} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import {useState, useEffect} from 'react';

import Ticker from './Ticker';
import { Menu, MenuItem } from '@material-ui/core';
import SearchModalPop from './SearchModalPop';
import { ListGroup } from 'react-bootstrap';

const styles = StyleSheet.create({
    title: {
      fontSize: 32,
      justifyContent: 'center',
      alignContent:'center',
    },
    modal:{
      width: '100VW',
      height: '100VH',
      },
  


    bar: {
      backgroundColor: 'black',
      borderColor:'blue',
      borderTopWidth:2,
      borderBottomWidth:2,
    },
    text: {
        backgroundColor: 'skyblue',
        color:'black',
        fontSize: 22,
        width:200
      },
      centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
      },
      modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5
      },
      openButton: {
        backgroundColor: "#F194FF",
        borderRadius: 20,
        padding: 10,
        elevation: 2
      },
      textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
      },
      modalText: {
        marginBottom: 15,
        textAlign: "center"
      },
      item: {
        padding: 20,
        marginVertical: 8,
        marginHorizontal: 16,
      }     
        
  
  });

  export default function CrickAppBar(props) {
 //   const navigation = useNavigation();

    const [show, setShow] = useState(false);


    const [playerList, setPlayerList] = useState(new Array(0));
    const [currentList, setCurrentList] = useState(new Array(0));
 
    function _goBack () { alert('back')};

    function _handleSearch()  {
      setCurrentList(playerList);
      setShow(true);

    }

  function _handleMore () { alert('Shown more')};



/*
   renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
      <MenuItem onClick={handleMenuClose}>My account</MenuItem>
    </Menu>
  );
*/
   
 
  function getPlayerData ()
  {
    const requestOptions = {
      method: 'GET',
      headers: { 'Authorization': 'Token ' + props.token, 'Content-Type': 'application/json' }
      };
      fetch('http://market.cricktrade.com/market/api/allplayers', requestOptions)
          .then(async response => {
              const data = await response.json();
              // check for error response
              if (response.status != 200) {
                  // get error message from body or default to response status
                  const error = (data && data.message) || response.status;
                  alert('There was an error!' +  error.toString());
                  return;
                  //return Promise.reject(error);
              }
              else
              {

                var size = data.length;
//                alert(size);  
                var list = new Array(size);  
                for (var i=0;i<size;i++)
                {
                  var pair = {name:'', code:''};
                  pair.name = data[i].fields.name;
                  pair.code = data[i].fields.code;
                  list[i] = pair;
                }
                setPlayerList(list);
                setCurrentList(list);
  
              }
              
            
          })
          .catch(error => {
              alert('There was an error!' +  error.toString());
          });
  
  }

  function evaluatePlayerList (searchText)
  {
    var list = new Array(0);
    var size = playerList.length;
    for (var i=0;i<size;i++)
    {
      if (playerList[i].name.toLowerCase().startsWith(searchText.toLowerCase()))
       list.push(playerList[i]);
    }
    setCurrentList(list);
  }


  useEffect ( ()=>
  {
    getPlayerData();

  }, []);




  //            <Appbar.Content title="CrickTrade" subtitle="AppBar" />
//            <TextInput placeholder = {'Search'} style={styles.text}></TextInput>

      


      function searchChanged (text) 
      {
        evaluatePlayerList(text);

      }

      return (
          <View>
            <Appbar.Header style={styles.bar}>
            <Appbar.BackAction onPress={_goBack} />
            <Appbar.Content title="CrickTrade" subtitle="Game" />
            <Appbar.Action icon="magnify" onPress={_handleSearch} />
            <Appbar.Action icon="dots-vertical" onPress={_handleMore} />
            <View style={styles.centeredView}>
            <Modal style={styles.modal}
                animationType="slide"
                transparent={false}
                visible={show}
                onRequestClose={() => {
                setShow(false);
                }}>
            <View style={styles.centeredView}>
                <View style={styles.modalView}>

                    <TextInput  onChangeText={text =>searchChanged(text)} placeholder = {'Search'} style={styles.text}></TextInput>
                    <FlatList
                    data={currentList}
                    renderItem={({item}) => <TouchableOpacity key={item.name} onPress ={event => {setShow(false); alert(item.name); }}>

                    <Text style={styles.item}>{item.name}</Text></TouchableOpacity>}
                    />

                    <TouchableHighlight
                    style={{ ...styles.openButton, backgroundColor: "#2196F3" }}
                    onPress={() => {
                        setShow(false);
                    }}
                    >
                    <Text style={styles.textStyle}>Close</Text>
                    </TouchableHighlight>

                </View>
            </View>
            </Modal>
            </View>
            </Appbar.Header>
            </View>
            
        );
    }


