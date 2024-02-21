import React, {useState, useEffect, useRef} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import NetInfo from '@react-native-community/netinfo';
import {
  ImageBackground,
  StyleSheet,
  View,
  Text,
  ScrollView,
  Dimensions,
  TouchableOpacity,
  Linking,
  Image,
  Animated,
} from 'react-native';
import {NavigationContainer, useNavigation} from '@react-navigation/native';

async function getData() {
  const api = 'https://api.github.com/users/HabilYusufAyhan/repos';
  const resp = await fetch(api);
  const respData = await resp.json();
  return respData;
}
const Stack = createStackNavigator();

const WhoAmIScreen = () => {
  // const [borderColor] = useState(new Animated.Value(0)); // Başlangıç border rengi
  const [borderColor] = useState(new Animated.Value(0)); // Başlangıç border rengi

  useEffect(() => {
    animateBorder(); // Animasyonu başlat
  }, []);

  const animateBorder = () => {
    Animated.sequence([
      Animated.timing(borderColor, {
        toValue: 4, // Yeni border rengi
        duration: 10000, // Animasyon süresi
        useNativeDriver: false, // Native sürücüyü kullan
      }),
      Animated.timing(borderColor, {
        toValue: 0, // Başlangıç border rengine geri dön
        duration: 10000,
        useNativeDriver: false,
      }),
    ]).start(() => animateBorder()); // Animasyonu tekrar başlat
  };

  const interpolatedColor = borderColor.interpolate({
    inputRange: [0, 1, 2, 3, 4],
    outputRange: ['#FF5733', '#FFBD33', '#33FF57', '#338BFF', '#8733FF'],
  });

  const [typedText, setTypedText] = useState('');
  const fullText = `My name is Habil Yusuf Ayhan. I am 19 years old. I am a 2nd year student at Erzincan Binali Yıldırım University. I have been interested in programming since the end of my high school life. My first curiosity was about mobile programming. but I couldn't find what I want in this field. Then I met the web. The web industry has officially pulled me in. When I say html css and javascript, the web industry has become my business. Even now, I am trying to improve myself in the web industry, to learn new languages ​​and new frameworks. Although I focused more on the front end, I did not leave the back end side. I am working on Node.js and mssql. My main goal is to be a full stack web developer. I am working hard to achieve this.`;

  useEffect(() => {
    const timer = setTimeout(() => {
      const nextChar =
        fullText[typedText.length] + fullText[typedText.length + 1];
      if (nextChar) {
        setTypedText(prevText => prevText + nextChar);
      }
    }, 1);

    return () => clearTimeout(timer);
  }, [typedText]);

  const navigation = useNavigation();

  let [menuVisible, setMenuVisible] = useState(false); // Menünün görünürlüğünü kontrol etmek için state

  return (
    <View style={styles.container}>
      <View style={styles.mainnavbar}>
        <View style={styles.navbar}>
          <Image style={styles.logo} source={require('./icon/logo.png')} />
          <TouchableOpacity onPress={() => setMenuVisible(!menuVisible)}>
            <Image
              style={[styles.burger]}
              source={
                menuVisible
                  ? require('./icon/burgeropen.png')
                  : require('./icon/menu.png')
              }
            />
          </TouchableOpacity>
        </View>
      </View>
      <View style={[styles.mainpage, {display: menuVisible ? 'none' : 'flex'}]}>
        <Animated.View style={[styles.mask, {borderColor: interpolatedColor}]}>
          <Image
            style={[styles.whoamiimg]}
            source={require('./icon/whoami.jpg')}></Image>
        </Animated.View>
        <Text style={styles.whoami}>{typedText}</Text>
      </View>
      <View style={[styles.menu, {display: menuVisible ? 'flex' : 'none'}]}>
        <TouchableOpacity
          style={[styles.menuborder]}
          onPress={() => {
            setMenuVisible(!menuVisible);
            navigation.navigate('Home');
          }}>
          <Text style={styles.menutext}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            setMenuVisible(!menuVisible);
            navigation.navigate('MyProjects');
          }}
          style={[styles.menuborder]}>
          <Text style={styles.menutext}>My Project</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.menuborder]}
          onPress={() => {
            setMenuVisible(!menuVisible);
            navigation.navigate('WhoAmI');
          }}>
          <Text style={styles.menutext}>Who am I</Text>
        </TouchableOpacity>
      </View>
      <View>
        <View style={styles.footerAccounts}>
          <TouchableOpacity
            onPress={() =>
              Linking.openURL('https://www.instagram.com/habilyusufayhan/')
            }
            style={styles.footerObject}>
            <Image
              source={require('./icon/instagram.png')}
              style={styles.accounts}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() =>
              Linking.openURL('https://twitter.com/HabilYusufAyhan')
            }
            style={styles.footerObject}>
            <Image
              source={require('./icon/twitter.png')}
              style={styles.accounts}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() =>
              Linking.openURL(
                'https://www.linkedin.com/in/habil-yusuf-ayhan-92ba39227/',
              )
            }
            style={styles.footerObject}>
            <Image
              source={require('./icon/linkedin.png')}
              style={styles.accounts}
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const App = () => {
  // diğer kodlar
  const [isConnected, setIsConnected] = useState(null);

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      setIsConnected(state.isConnected);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  useEffect(() => {
    if (isConnected === false) {
      // Bağlantı ayarlarına yönlendir
      // Uygulamayı kapatmak için:
      // Bu platforma özel bir kod yazmanız gerekebilir.
      // Örneğin:
      // if (Platform.OS === 'ios') {
      //   Linking.openURL('app-settings:');
      // } else {
      //   Linking.openSettings();
      // }
    }
  }, [isConnected]);

  if (isConnected === false) {
    return (
      <View>
        <Text>
          İnternet bağlantısı yok. Uygulamaya erişmek için lütfen internet
          bağlantınızı kontrol edin.
        </Text>
      </View>
    );
  }
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          options={{headerShown: false}}
          name="Home"
          component={HomeScreen}
        />
        <Stack.Screen
          options={{headerShown: false}}
          name="WhoAmI"
          component={WhoAmIScreen}
        />
        <Stack.Screen
          options={{headerShown: false}}
          name="MyProjects"
          component={MyProjects}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
const HomeScreen = () => {
  const [borderColor] = useState(new Animated.Value(0)); // Başlangıç border rengi

  useEffect(() => {
    animateBorder(); // Animasyonu başlat
  }, []);

  const animateBorder = () => {
    Animated.sequence([
      Animated.timing(borderColor, {
        toValue: 4, // Yeni border rengi
        duration: 10000, // Animasyon süresi
        useNativeDriver: false, // Native sürücüyü kullan
      }),
      Animated.timing(borderColor, {
        toValue: 0, // Başlangıç border rengine geri dön
        duration: 10000,
        useNativeDriver: false,
      }),
    ]).start(() => animateBorder()); // Animasyonu tekrar başlat
  };

  const interpolatedColor = borderColor.interpolate({
    inputRange: [0, 1, 2, 3, 4],
    outputRange: ['#FF5733', '#FFBD33', '#33FF57', '#338BFF', '#8733FF'],
  });
  const navigation = useNavigation();

  const [data, setData] = useState([]);
  let [menuVisible, setMenuVisible] = useState(false); // Menünün görünürlüğünü kontrol etmek için state

  useEffect(() => {
    const fetchData = async () => {
      const fetchedData = await getData();
      setData(fetchedData);
    };

    fetchData();
  }, []);

  let animatedValue = useRef(new Animated.Value(0.6)).current;

  useEffect(() => {
    const animation = () => {
      Animated.sequence([
        Animated.timing(animatedValue, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(animatedValue, {
          toValue: 0.6,
          duration: 1000,
          useNativeDriver: true,
        }),
      ]).start(() => animation());
    };

    animation();

    return () => {
      animatedValue.setValue(0.6);
    };
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.mainnavbar}>
        <View style={styles.navbar}>
          <Image style={styles.logo} source={require('./icon/logo.png')} />
          <TouchableOpacity onPress={() => setMenuVisible(!menuVisible)}>
            <Image
              style={[styles.burger]}
              source={
                menuVisible
                  ? require('./icon/burgeropen.png')
                  : require('./icon/menu.png')
              }
            />
          </TouchableOpacity>
        </View>
      </View>
      <View style={[styles.mainpage, {display: menuVisible ? 'none' : 'flex'}]}>
        <Animated.View
          style={[
            styles.mask,
            {borderColor: interpolatedColor},
            {display: menuVisible ? 'none' : 'flex'},
          ]}>
          <Image
            style={[styles.mainimg]}
            source={require('./icon/main.jpg')}></Image>
        </Animated.View>
        <Animated.Text
          style={[
            {
              opacity: animatedValue,
              fontSize: 30,
              color: 'white',
              fontWeight: 'bold',
            },
            {display: menuVisible ? 'none' : 'flex'},
          ]}>
          Habil Yusuf Ayhan
        </Animated.Text>
        <Animated.Text style={[styles.maintext, {color: interpolatedColor}]}>
          Web / Mobile Developer
        </Animated.Text>
      </View>
      <View style={[styles.menu, {display: menuVisible ? 'flex' : 'none'}]}>
        <TouchableOpacity
          style={[styles.menuborder]}
          onPress={() => {
            setMenuVisible(!menuVisible);
            navigation.navigate('Home');
          }}>
          <Text style={styles.menutext}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            setMenuVisible(!menuVisible);
            navigation.navigate('MyProjects');
          }}
          style={styles.menuborder}>
          <Text style={styles.menutext}>My Project</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.menuborder}
          onPress={() => {
            setMenuVisible(!menuVisible);
            navigation.navigate('WhoAmI');
          }}>
          <Text style={styles.menutext}>Who am I</Text>
        </TouchableOpacity>
      </View>
      <View>
        <View style={styles.footerAccounts}>
          <TouchableOpacity
            onPress={() =>
              Linking.openURL('https://www.instagram.com/habilyusufayhan/')
            }
            style={styles.footerObject}>
            <Image
              source={require('./icon/instagram.png')}
              style={styles.accounts}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() =>
              Linking.openURL('https://twitter.com/HabilYusufAyhan')
            }
            style={styles.footerObject}>
            <Image
              source={require('./icon/twitter.png')}
              style={styles.accounts}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() =>
              Linking.openURL(
                'https://www.linkedin.com/in/habil-yusuf-ayhan-92ba39227/',
              )
            }
            style={styles.footerObject}>
            <Image
              source={require('./icon/linkedin.png')}
              style={styles.accounts}
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};
const MyProjects = () => {
  const navigation = useNavigation();
  // const [borderColor] = useState(new Animated.Value(0)); // Başlangıç border rengi
  const [borderColor] = useState(new Animated.Value(0)); // Başlangıç border rengi

  useEffect(() => {
    animateBorder(); // Animasyonu başlat
  }, []);

  const animateBorder = () => {
    Animated.sequence([
      Animated.timing(borderColor, {
        toValue: 4, // Yeni border rengi
        duration: 10000, // Animasyon süresi
        useNativeDriver: false, // Native sürücüyü kullan
      }),
      Animated.timing(borderColor, {
        toValue: 0, // Başlangıç border rengine geri dön
        duration: 10000,
        useNativeDriver: false,
      }),
    ]).start(() => animateBorder()); // Animasyonu tekrar başlat
  };

  const interpolatedColor = borderColor.interpolate({
    inputRange: [0, 1, 2, 3, 4],
    outputRange: ['#FF5733', '#FFBD33', '#33FF57', '#338BFF', '#8733FF'],
  });
  const [data, setData] = useState([]);
  let [menuVisible, setMenuVisible] = useState(false); // Menünün görünürlüğünü kontrol etmek için state

  useEffect(() => {
    const fetchData = async () => {
      const fetchedData = await getData();
      setData(fetchedData);
    };

    fetchData();
  }, []);
  /* {data.map(item => (
        <View key={item.name} style={{padding: 20}}>
          <Text>{item.name}</Text>
        </View>
      ))}*/
  return (
    <View style={styles.container}>
      <View style={styles.mainnavbar}>
        <View style={styles.navbar}>
          <Image style={styles.logo} source={require('./icon/logo.png')} />
          <TouchableOpacity onPress={() => setMenuVisible(!menuVisible)}>
            <Image
              style={[styles.burger]}
              source={
                menuVisible
                  ? require('./icon/burgeropen.png')
                  : require('./icon/menu.png')
              }
            />
          </TouchableOpacity>
        </View>
      </View>
      <Animated.ScrollView
        style={[{flex: 1}, {display: menuVisible ? 'none' : 'flex'}]}>
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          {data.map(item => (
            <TouchableOpacity
              key={item.name}
              style={[styles.project]}
              onPress={() => Linking.openURL(item.html_url)}>
              <Animated.View
                style={[
                  styles.project,
                  {borderColor: interpolatedColor, borderBottomWidth: 2},
                ]}>
                <Animated.Text
                  style={[styles.projecttitle, {color: interpolatedColor}]}>
                  {item.name}
                </Animated.Text>
                <Text style={styles.projectdesc}>{item.description}</Text>
              </Animated.View>
            </TouchableOpacity>
          ))}
        </View>
      </Animated.ScrollView>
      <View style={[styles.menu, {display: menuVisible ? 'flex' : 'none'}]}>
        <TouchableOpacity
          style={[styles.menuborder]}
          onPress={() => {
            setMenuVisible(!menuVisible);
            navigation.navigate('Home');
          }}>
          <Text style={styles.menutext}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.menuborder]}
          onPress={() => {
            setMenuVisible(!menuVisible);
            navigation.navigate('MyProjects');
          }}>
          <Text style={styles.menutext}>My Project</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.menuborder]}
          onPress={() => {
            setMenuVisible(!menuVisible);
            navigation.navigate('WhoAmI');
          }}>
          <Text style={styles.menutext}>Who am I</Text>
        </TouchableOpacity>
      </View>
      <View>
        <View style={styles.footerAccounts}>
          <TouchableOpacity
            onPress={() =>
              Linking.openURL('https://www.instagram.com/habilyusufayhan/')
            }
            style={styles.footerObject}>
            <Image
              source={require('./icon/instagram.png')}
              style={styles.accounts}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() =>
              Linking.openURL('https://twitter.com/HabilYusufAyhan')
            }
            style={styles.footerObject}>
            <Image
              source={require('./icon/twitter.png')}
              style={styles.accounts}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() =>
              Linking.openURL(
                'https://www.linkedin.com/in/habil-yusuf-ayhan-92ba39227/',
              )
            }
            style={styles.footerObject}>
            <Image
              source={require('./icon/linkedin.png')}
              style={styles.accounts}
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};
const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;
const styles = StyleSheet.create({
  container: {
    backgroundColor: 'black',
    height: screenHeight,
    flex: 1,
    justifyContent: 'space-between',
  },
  mainnavbar: {
    backgroundColor: 'black',
    paddingBottom: 15,
    paddingTop: 15,
    paddingLeft: 10,
    paddingRight: 5,
    //    flex: 1,
  },
  navbar: {
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
  },
  logo: {
    width: 50,
    height: 50,
  },
  burger: {
    width: 50,
    height: 50,
  },
  imageclick: {
    color: 'blue',
  },
  menu: {
    // Başlangıçta menünün görünmez olması için display:none kullanıldı
    display: 'none',
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    width: screenWidth,
    height: screenHeight,
  },
  menutext: {
    fontSize: 25,
    marginTop: 5,
    marginBottom: 5,
    fontWeight: '500',
    color: 'white',
  },
  mainpage: {
    alignItems: 'center',
  },

  accounts: {
    width: 35,
    height: 35,
  },

  footerAccounts: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: screenWidth,
    paddingBottom: 10,
    paddingTop: 10,
    paddingLeft: 10,
    paddingRight: 10,
  },
  footerObject: {
    paddingLeft: 5,
    paddingRight: 5,
  },
  footerText: {
    color: 'white',
    paddingRight: 10,
  },

  whoami: {
    color: 'white',
    marginLeft: 10,
    marginRight: 10,
    textAlign: 'center',
    height: screenHeight / 3,
  },
  whoamiimg: {
    width: 250,
    height: 250,
    borderRadius: 180,
  },
  mainimg: {
    width: 300,
    height: 300,
    borderRadius: 600,
  },
  mask: {
    marginBottom: 50,
    borderWidth: 3,
    borderRadius: 180,
  },
  menuborder: {
    borderBottomWidth: 2,
    paddingRight: 10,
    paddingLeft: 10,
    borderColor: 'red',
    marginTop: 10,
    marginBottom: 10,
  },
  maintext: {
    color: 'white',
    marginTop: 5,
  },
  projecttitle: {
    color: 'white',
    fontSize: 20,
    fontWeight: '500',
    textAlign: 'center',
    width: screenWidth - 20,
  },
  projectdesc: {
    color: 'white',
    textAlign: 'center',
    width: screenWidth - 20,
  },
  project: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: screenWidth - 20,
    paddingBottom: 10,

    marginBottom: 20,
  },
});

export default App;
