import React, { createContext, useEffect, useState } from 'react'
import { Platform, PermissionsAndroid } from 'react-native'
import RtcEngine, { ChannelProfile, ClientRole } from 'react-native-agora'

const APP_ID = 'af6ff161187b4527ac35d01f200f7980'

export const EngineContext = createContext()

export default function EngineProvider({ children }: { children: any }) {
  const [engine,setEngine]= useState<RtcEngine | null>(null)

  useEffect(() => {
    _initEngine()

    return () => engine?.destroy()
  }, [])

  const _initEngine = async () => {
    console.log('Initializing engine...')
    try {
      if (Platform.OS === 'android') {
        await PermissionsAndroid.requestMultiple([
          PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
          PermissionsAndroid.PERMISSIONS.CAMERA,
        ]);
      }

      // Create a new instance of the agora engine
      const _engine = await RtcEngine.create(APP_ID)

      // Set it to work on the background
      await _engine?.setParameters('{"che.audio.opensl":true}')
      await _engine?.enableAudioVolumeIndication(200, 10, true)

      // Enable video module and set up video encoding configs
      await _engine.enableVideo();

      // Make this room live broadcasting room
      await _engine.setChannelProfile(ChannelProfile.LiveBroadcasting);

      // Set client role as audience by default, the header would handle the set client role to broadcaster if necessary
      await _engine.setClientRole(ClientRole.Audience)

      // Set audio route to speaker
      await _engine.setDefaultAudioRoutetoSpeakerphone(true);


      // Set the engine in the reducer for actions like switch camera, leave channel etc
      // console.log('Engine created!', _engine)
      setEngine(_engine)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <EngineContext.Provider value={engine}>
      {children}
    </EngineContext.Provider>
  )
}
