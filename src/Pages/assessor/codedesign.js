<Box h={40} p={matches == true ? 10 : 0}>
  <Box mb={2}>
    <Box bg="blackAlpha.200" p={10}>
      <Center>
        <Avatar
          size="xl"
          name="Christian Nwamba"
          src="https://bit.ly/code-beast"
          mb={2}
        />

        <Box ml="3" userSelect={"text"}>
          <Text fontWeight="bold" color={"blackAlpha.700"}>
            Caimor Reenjay
            <br />
            <span style={{ fontSize: "13px", fontWeight: "normal" }}>
              reenjie17@gmail.com
            </span>
            <br />
            <span
              style={{
                fontSize: "13px",
                fontWeight: "normal",
                userSelect: "",
              }}
            >
              09557653775
            </span>
            <br />
            <span
              style={{
                fontSize: "13px",
                fontWeight: "normal",
                userSelect: "",
              }}
            >
              LEAD DEVELOPER
            </span>
            <Text
              style={{ fontSize: "15px", fontWeight: "bold" }}
              color={"teal.500"}
            >
              MMS
            </Text>
          </Text>
        </Box>
      </Center>
    </Box>

    <Box flex="1" bg="teal.50" color={"blackAlpha.600"} p={5}>
      <Stack spacing={0} fontSize={13} color={"blackAlpha.600"} float="right">
        <Text fontWeight="normal">Date-Created</Text>
        <Text fontWeight="normal">September 15 2022</Text>
        <Text fontWeight="normal">@11:30 am</Text>
        <br />
        <Text fontWeight="normal">Date-Received</Text>
        <Text fontWeight="normal">September 15 2022</Text>
        <Text fontWeight="normal">@11:30 am</Text>
        <span>
          <Badge variant="outline" colorScheme="green">
            PENDING REQUEST
          </Badge>
        </span>
      </Stack>
      <Text color={"teal.400"} fontWeight="bold">
        Job Description
      </Text>

      <Stack spacing={0} fontSize={15}>
        <Text fontWeight="bold">New Installation/Fabrication</Text>
        <Text fontWeight="normal">Air Condition Unit</Text>
      </Stack>

      <Stack mt={2} direction={["column", "row"]} ml={10} spacing="24px">
        <Box>
          <Text fontWeight="normal">Serial No.</Text>
          <Text fontWeight="normal">465469835</Text>
        </Box>
        <Box>
          <Text fontWeight="normal">Model No.</Text>
          <Text fontWeight="normal">1064648556</Text>
        </Box>
      </Stack>

      <Stack mt={5} spacing="24px" ml={10}>
        <Box>
          <Text>Prioritization</Text>
          <RadioGroup defaultValue="0">
            <Stack spacing={5} direction="row">
              <Radio colorScheme="red" value="1">
                Urgent
              </Radio>
              <Radio colorScheme="green" value="2">
                Not Urgent
              </Radio>
            </Stack>
          </RadioGroup>
        </Box>

        <Box>
          <Text>Type of Repair</Text>
          <RadioGroup defaultValue="0">
            <Stack spacing={5} direction="row">
              <Radio colorScheme="twitter" value="1">
                Major Repair
              </Radio>
              <Radio colorScheme="yellow" value="2">
                Minor Repair
              </Radio>
            </Stack>
          </RadioGroup>
        </Box>

        <Box>
          <Text>Recommendation</Text>
          <RadioGroup defaultValue="0">
            <Stack spacing={5} direction="row">
              <Radio colorScheme="teal" value="1">
                In-House
              </Radio>
              <Radio colorScheme="orange" value="2">
                OutSource
              </Radio>
            </Stack>
          </RadioGroup>
        </Box>
      </Stack>

      <Container mt={4} textAlign={"right"} maxW={"container.xxl"}>
        <PopoverComponent
          btntitle="Approve"
          message="Are you Sure?"
          Confirm={HandleConfirm}
          PassId={"5"}
          BtnColor={"cyan"}
        />
      </Container>
    </Box>
  </Box>
</Box>;
