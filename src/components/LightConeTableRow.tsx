import { Group, Image, Stack, Text, useMantineTheme } from "@mantine/core"
import { IconHeart, IconShield, IconSword } from "@tabler/icons-react"
import PathTypeImage from "./PathTypeImage"
import { LightConeOverview } from "../definition"
import { FC } from "react"
import { useMediaQuery } from "@mantine/hooks"
import { useNavigate } from "react-router-dom"

interface LightConeTableRowProp {
    lightCone: LightConeOverview
}

const LightConeTableRow: FC<LightConeTableRowProp> = ({ lightCone }) => {
    const navigate = useNavigate()
    const theme = useMantineTheme()
    const maxMedium = useMediaQuery(`(max-width: ${theme.breakpoints.md})`);
    const minExtraSmall = useMediaQuery(`(min-width: ${theme.breakpoints.xs})`)

    const insertPassiveParams: (description: string, params: { min: number[], max: number[] }, minFlag: boolean) => string =
        (description, params, minFlag) => {
            //! Currenty assuming that replacement word stays the same
            //! Current filtered string is '<value>'
            const paramsRegex = /<value>/g;
            const paramsArr = minFlag ? params.min : params.max
            let keywordIndex = 0

            const insertedString = description.replace(paramsRegex, () => {
                const replacementValue = paramsArr[keywordIndex];
                keywordIndex++;
                return replacementValue.toString();
            });

            return insertedString;
        }


    return (
        <tr style={{ cursor: 'pointer', fontWeight: 600, width: '100%' }} onClick={() => { navigate(lightCone.name) }}>
            <td><Group spacing='xs' maw={maxMedium ? '75px' : 'auto'}>
                <Image src={lightCone.imageUrl} fit="contain" height={maxMedium ? 'auto' : 80} width={maxMedium ? 75 : 'auto'} caption={lightCone.name} />
            </Group></td>
            <td><Group spacing='xs' noWrap miw={80} maw={'20vw'}>
                <PathTypeImage icon={lightCone.path} imageProps={{ height: maxMedium ? 25 : 35, width: 'auto' }} />
                <Text align={maxMedium ? 'center' : "match-parent"} w="100%">{lightCone.path}</Text>
            </Group></td>
            {maxMedium ?
                <td>
                    <Stack miw={85}>
                        <Group noWrap spacing='xs'>
                            <IconHeart /><Text>{lightCone.hp.min} ~ {lightCone.hp.max}</Text>
                        </Group>

                        <Group noWrap spacing='xs'>
                            <IconShield /><Text>{lightCone.def.min} ~ {lightCone.def.max}</Text>
                        </Group>

                        <Group noWrap spacing='xs'>
                            <IconSword /><Text>{lightCone.atk.min} ~ {lightCone.atk.max}</Text>
                        </Group>
                    </Stack>
                </td> :
                <>
                    <td>
                        <Group noWrap spacing='xs' miw={85}>
                            <IconHeart /><Text>{lightCone.hp.min} ~ {lightCone.hp.max}</Text>
                        </Group>

                    </td>
                    <td>
                        <Group noWrap spacing='xs' miw={85}>
                            <IconShield /><Text>{lightCone.def.min} ~ {lightCone.def.max}</Text>
                        </Group>
                    </td>
                    <td>
                        <Group noWrap spacing='xs' miw={85}>
                            <IconSword /><Text>{lightCone.atk.min} ~ {lightCone.atk.max}</Text>
                        </Group>
                    </td>
                </>
            }
            {minExtraSmall && <td style={{ minWidth: '250px', maxWidth: '30vw' }}>
                <Text>{lightCone.passive.name}</Text>
                <Text weight={300}>{insertPassiveParams(lightCone.passive.description, lightCone.passive.params, true)}</Text>
            </td>
            }
        </tr>)
}

export default LightConeTableRow