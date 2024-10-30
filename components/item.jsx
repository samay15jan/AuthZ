import { useState, useEffect } from 'react'
import { Text } from 'react-native-paper'
import { URI, TOTP } from 'otpauth'
import { View } from 'react-native'
import { ProgressBar, MD3Colors } from 'react-native-paper';

export default function Item({ uri }) {
  const [otp, setOtp] = useState(null)
  const [issuer, setIssuer] = useState(null);
  const [label, setLabel] = useState(null);
  const [progress, setProgress] = useState(null);

  const generateTOTP = async () => {
    const totp = URI.parse(uri)
    const newOtp = TOTP.generate(totp)
    setOtp(newOtp)
    setIssuer(totp.issuer)
    setLabel(totp.label)
    const currentTime = Math.floor(Date.now() / 1000)
    const timeRemaining = 30 - (currentTime % 30)
    const progress = timeRemaining / 30
    setProgress(progress)
  }

  useEffect(() => {
    generateTOTP()

    const intervalId = setInterval(() => {
      generateTOTP()
    }, 1000)

    return () => clearInterval(intervalId)
  }, [uri])

  return (
    <View>
      {otp && (
        <>
          <Text variant="titleLarge">{`${issuer}: ${label}`}</Text>
          <Text variant="titleLarge">{otp}</Text>
          <ProgressBar progress={progress} color={progress < 0.3 ? MD3Colors.error50 : MD3Colors.primary60} />
        </>
      )}
    </View>
  );
}
