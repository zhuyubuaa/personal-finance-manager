import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  FormLabel,
  InputAdornment,
  Select,
  MenuItem,
  RadioGroup,
  FormControlLabel,
  Radio,
} from "@mui/material";
import { useEffect, useState } from "react";
import FormControl from "@mui/material/FormControl";
import { useUserContext } from "../../context/UserContext";

//Temp dummy data
const typesData = {
  income: [
    {
      typeName: "Bonus",
    },
    {
      typeName: "Other Income",
    },
    {
      typeName: "Red bag",
    },
    {
      typeName: "Salary",
    },
  ],
  outcome: [
    {
      typeName: "Dining",
    },
    {
      typeName: "Other Expenditure",
    },
    {
      typeName: "Shopping",
    },
    {
      typeName: "Sports",
    },
  ],
};

interface SelectedSub {
  main: string;
  sub: string;
}

interface SubType {
  typeName: string;
}

interface Account {
  a_id: number;
  a_name: string;
  remaining: number;
}

interface Ledger {
  ab_id: number;
  ab_name: string;
}

interface Account {
  a_id: number;
  a_name: string;
  remaining: number;
}

interface Ledger {
  ab_id: number;
  ab_name: string;
}

export default function Transaction(props: any): JSX.Element {
  const { open, onClose } = props;
  const [amount, setAmount] = useState<number>(0);
  const [types, setTypes] = useState<any>({}); //in-out all data
  const [subTypes, setSubTypes] = useState<SubType[]>([]);
  const [selectedType, setSelectedType] = useState<string>("income");
  const [selectedSub, setSelectedSub] = useState<SelectedSub | "">(
    {} as SelectedSub
  );
  const [remark, setRemark] = useState<string>("");
  const [accList, setAccList] = useState<Account[]>([]);
  const [selectedAcc, setSelectedAcc] = useState<Account>();
  const [ledgerList, setLedgerList] = useState<Ledger[]>([]);
  const [selectedLedger, setSelectedLedger] = useState<Ledger>();
  const curUser = useUserContext().currentUser;

  useEffect(() => {
    getTypes();
    getAccList();
    getLedgerList();
  }, []);

  const getTypes = async (): Promise<any> => {
    try {
      const response = await fetch("http://localhost:8000/type", {
        method: "get",
        headers: { "Content-Type": "application/json" },
      });
      // response.json().then((res) => console.log("res", res));

      if (response.status === 200) {
        const data = (await response.json()) as any;
        setTypes(data);
        const subData = data["income"];
        setSubTypes(() => [...subData]);
      }
    } catch (error) {
      console.log("Error fetching type data", error);
    }
  };

  const getAccList = async (): Promise<any> => {
    try {
      const response = await fetch(
        "http://localhost:8000/account?u_id=" + curUser?.userId,
        {
          method: "get",
          headers: { "Content-Type": "application/json" },
        }
      );
      if (response.status === 200) {
        const data = (await response.json()) as any;
        console.log("accList", data);
        setAccList(data);
      }
    } catch (error) {
      console.log("Error fetching acc data", error);
    }
  };
  const getLedgerList = async (): Promise<any> => {
    try {
      const response = await fetch(
        "http://localhost:8000/accountbook?u_id=" + curUser?.userId,
        {
          method: "get",
          headers: { "Content-Type": "application/json" },
        }
      );

      if (response.status === 200) {
        const data = (await response.json()) as any;
        console.log("ledgerList", data);
        setLedgerList(data);
      }
    } catch (error) {
      console.log("Error fetching ledger data", error);
    }
  };

  const onTypeChange = (event: any, value: any): void => {
    setSelectedType(value);
    if (value === "income") {
      const inTypes = types.income;
      setSubTypes(() => [...inTypes]);
      setSelectedSub({ main: "income", sub: "" });
    } else {
      const outTypes = types.expense;
      setSubTypes(() => [...outTypes]);
      setSelectedSub({ main: "expense", sub: "" });
    }
  };

  const onSubTypeChange = (event: any, value: any) => {
    setSelectedSub({
      main: selectedType,
      sub: event.target.value,
    });
  };

  const onAccChange = (event: any, value: any) => {
    const found = accList.find((acc) => acc.a_name === event.target.value);
    // console.log("found", found);
    setSelectedAcc({
      a_id: found?.a_id || 0,
      a_name: event.target.value,
      remaining: 0,
    });
  };

  const onLedgerChange = (event: any, value: any) => {
    const found = ledgerList.find((l) => l.ab_name === event.target.value);
    console.log("found", found);
    setSelectedLedger({
      ab_id: found?.ab_id || 0,
      ab_name: event.target.value,
    });
  };

  const onSubmit = async (event: any): Promise<any> => {
    event.preventDefault();

    try {
      const newTransaction = {
        l_amount: selectedType === "income" ? amount : -amount,
        type_name: selectedSub.sub,
        remark: remark,
        a_id: selectedAcc?.a_id,
        ab_id: selectedLedger?.ab_id,
      };

      // console.log("new log", newTransaction);

      const response = await fetch("http://localhost:8000/log", {
        method: "post",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newTransaction),
      });

      console.log("response", response);
    } catch (error) {
      console.log("Error adding transaction");
    } finally {
      onClose();
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>新建日志</DialogTitle>
      <DialogContent>
        <form onSubmit={onSubmit}>
          <FormLabel>Amount</FormLabel>
          <TextField
            required
            type="number"
            size="small"
            id="trans_amount"
            value={amount}
            onChange={(e) => setAmount(+e.target.value)}
            fullWidth
            sx={{ mb: 2 }}
            InputProps={{
              inputProps: { min: 0 },
              endAdornment: <InputAdornment position="end">¥</InputAdornment>,
            }}
          />
          <br />

          <FormLabel>Type</FormLabel>
          <RadioGroup value={selectedType} onChange={onTypeChange}>
            <FormControlLabel
              value="income"
              control={<Radio />}
              label="Income"
            />
            <FormControlLabel
              value="outcome"
              control={<Radio />}
              label="Expense"
            />
          </RadioGroup>
          <br />

          <FormControl sx={{ width: 552 }}>
            <FormLabel>Sub-Type</FormLabel>
            <Select
              value={selectedSub["sub"] || ""}
              onChange={onSubTypeChange}
              fullWidth
              size="small"
              sx={{ mb: 2 }}
            >
              {subTypes[0] &&
                subTypes.map((subType, i) => (
                  <MenuItem key={i} value={subType.typeName}>
                    {subType.typeName}
                  </MenuItem>
                ))}
            </Select>
          </FormControl>

          <FormControl sx={{ width: 552 }}>
            <FormLabel>Account</FormLabel>
            <Select
              value={selectedAcc?.a_name || ""}
              fullWidth
              onChange={onAccChange}
              size="small"
              sx={{ mb: 2 }}
            >
              {accList.map((accList, i) => (
                <MenuItem key={i} value={accList.a_name}>
                  {accList.a_name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl sx={{ width: 552 }}>
            <FormLabel>Ledger</FormLabel>
            <Select
              value={selectedLedger?.ab_name || ""}
              fullWidth
              onChange={onLedgerChange}
              size="small"
              sx={{ mb: 2 }}
            >
              {ledgerList.map((ledgerList, i) => (
                <MenuItem key={i} value={ledgerList.ab_name}>
                  {ledgerList.ab_name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormLabel>Remark</FormLabel>
          <TextField
            fullWidth
            size="small"
            value={remark}
            onChange={(e) => setRemark(e.target.value)}
          />
        </form>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={onSubmit}>Add</Button>
      </DialogActions>
    </Dialog>
  );
}
