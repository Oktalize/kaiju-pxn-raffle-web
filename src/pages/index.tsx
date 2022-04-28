import { useState } from "react";
import {
  Container,
  Heading,
  Text,
  Button,
  Box,
  Flex,
  VStack,
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableContainer,
  Link,
} from "@chakra-ui/react";
import type { NextPage } from "next";
import { ethers } from "ethers";
import drawOpenRaffleWinners from "../utils/kaijuraffle";
import { TOKEN_ABI, TOKEN_ADDRESS } from "../constants";

const Home: NextPage = () => {
  const [results, setResults] = useState<any>();
  const [showResults, setShowResults] = useState(false);

  const connectAndRun = async () => {
    const provider = new ethers.providers.InfuraProvider(
      "homestead",
      "57e665ef67b44c4687ad529b8b89397c"
    );
    const contract = new ethers.Contract(
      TOKEN_ADDRESS["KAIJU_RAFFLE"],
      TOKEN_ABI,
      provider
    );
    await drawOpenRaffleWinners(contract).then((winners) => {
      setResults(winners);
    });
    setShowResults(true);
  };

  return (
    <Box color="gray.200" style={{ backgroundColor: "#1A202C" }}>
      <Flex justifyContent="center" p="10px">
        <Heading pt="20px" size="lg" mb="30px" textAlign="center" color="white">
          Kaiju PXN Raffle Results
        </Heading>
      </Flex>
      <Flex p="10px" justifyContent="center">
        <Box
          border="1px"
          borderColor="gray.600"
          p="30px"
          mb="60px"
          textAlign="left"
          maxWidth="600px"
        >
          <Text mb="15px">
            This tool runs the same script that Augminted used to pick the
            winners of the{" "}
            <Link color="green.300" href="https://pxn.kaijukingz.io">
              Kaiju PXN raffle
            </Link>
            . It also uses the same{" "}
            <Link
              color="green.300"
              href="https://docs.ethers.io/ethers.js/v3.0/html/"
            >
              ethers.js
            </Link>{" "}
            library to run the on-chain queries directly on the{" "}
            <Link
              color="green.300"
              href="https://etherscan.io/address/0x9f3663ad48178ed5c34246d0a0eeb297809aa8b6"
            >
              raffle contract
            </Link>
            . This was created to help verify the randomness of their code, and
            also provide a complete list of winners for transparency reasons.
          </Text>
          <Text mb="15px">
            Since the random seed was generated on-chain, we can query it here
            and we will always get the same results every time we run the
            script. If you wish to learn more about how this process works,
            please see this{" "}
            <Link
              color="green.300"
              href="https://twitter.com/arzinator/status/1519389572316213248"
            >
              Twitter thread by @arzinator
            </Link>
            .
          </Text>
          <Text mb="15px">
            You can download the full list of raffle entries in CSV format{" "}
            <Link
              color="green.300"
              href="ipfs://QmNqaRttYbtZ6hgW5WXTGAgasrgHKgALSZgepvcRooNsK7"
            >
              here
            </Link>{" "}
            (this requires an IPFS browser to view). The full source code for
            this site is available on{" "}
            <Link
              color="green.300"
              href="https://github.com/oktalize/kaiju-pxn-raffle-web"
            >
              my github
            </Link>
            .
          </Text>
        </Box>
      </Flex>
      <Container maxW="100%">
        <Flex justify="center" w="100%">
          <VStack mb="30px">
            <Button
              onClick={connectAndRun}
              color={"green.300"}
              bg="gray.600"
              mb={16}
            >
              See Raffle Results
            </Button>
            {showResults && (
              <TableContainer fontSize="13px">
                <Table variant="simple">
                  <Thead>
                    <Tr>
                      <Th borderColor="gray.700">Entry #</Th>
                      <Th borderColor="gray.700">Address</Th>
                      <Th borderColor="gray.700">Total</Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    {results?.map(
                      ({
                        address,
                        entry,
                        total,
                      }: {
                        address: any;
                        entry: any;
                        total: any;
                      }) => (
                        <Tr key={entry}>
                          <Td borderColor="gray.700">{entry}</Td>
                          <Td
                            borderColor="gray.700"
                            textAlign="right"
                            fontFamily="monospace"
                          >
                            {address}
                          </Td>
                          <Td borderColor="gray.700" textAlign="right">
                            {total}
                          </Td>
                        </Tr>
                      )
                    )}
                  </Tbody>
                </Table>
              </TableContainer>
            )}
          </VStack>
        </Flex>
        <Text m="50px" textAlign="center" color="gray.500">
          This website was made by{" "}
          <Link color="green.300" href="https://oktal.eth.link/">
            oktal.eth
          </Link>
        </Text>
      </Container>
    </Box>
  );
};

export default Home;
