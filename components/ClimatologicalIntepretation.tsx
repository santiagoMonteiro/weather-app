import { descriptionOfInterpretation } from '@/constants/description-of-interpretation'
import { interpretationColors } from '@/constants/intepretation-colors'
import { Text, View } from 'react-native'

interface ClimatologicalInterpretationProps {
  interpretation: string
}

export function ClimatologicalInterpretation({
  interpretation,
}: ClimatologicalInterpretationProps) {
  return (
    <View
      style={[
        { backgroundColor: interpretationColors[interpretation] },
        { padding: 5 },
        { borderRadius: 5 },
        // { maxWidth: 180 },
      ]}
    >
      <Text
      style={[
        // {textAlign: 'center'}
      ]}>{descriptionOfInterpretation[interpretation]}</Text>
    </View>
  )
}
