import * as React from 'react';
import { View, StyleSheet, Button } from 'react-native';
import { Video, ResizeMode } from 'expo-av';
import { Typography } from '@mui/material';
import { Text} from 'react-native';


export default function App() {
  const video = React.useRef(null);
  const [status, setStatus] = React.useState({});
  return (
    <View 
    style={{flex: 1,
      justifyContent: 'center',
      backgroundColor: '#ecf0f1',}}><View style={{alignItems:'center'}}>
        <Text style={{fontWeight:'bold',alignItems:'center'}}>Demovideoplayer</Text></View>
      <Video
        ref={video}
        style={{ alignSelf: 'center',
        width: 320,
        height: 200,}}
        source={{
          uri: 'https://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4',
        }}
        useNativeControls
        resizeMode={ResizeMode.CONTAIN}
        isLooping
        onPlaybackStatusUpdate={status => setStatus(() => status)}
      />
      <View
       style={{ flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop:15}}>
        <Button
          title={status.isPlaying ? 'Pause' : 'Play'}
          onPress={() =>
            status.isPlaying ? video.current.pauseAsync() : video.current.playAsync()
          }
        />
      </View>
    </View>
  );
}

