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
        { marginTop: 3 },
        { marginBottom: 3 },
      ]}
    >
      <Text
        style={[
          {
            color:
              interpretation === '-3' || interpretation === '3'
                ? 'white'
                : 'black',
          },
        ]}
      >
        {descriptionOfInterpretation[interpretation]}
      </Text>
    </View>
  )
}
