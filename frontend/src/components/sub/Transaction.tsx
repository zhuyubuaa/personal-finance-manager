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
import {useEffect, useState} from "react";
import FormControl from "@mui/material/FormControl";

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

export default function Transaction(props: any): JSX.Element {
    const {open, onClose} = props;
    const [amount, setAmount] = useState<number>(0);
    const [types, setTypes] = useState<any>({}); //in-out all data
    const [subTypes, setSubTypes] = useState<SubType[]>([]);
    const [selectedType, setSelectedType] = useState<string>("income");
    const [selectedSub, setSelectedSub] = useState<SelectedSub | "">("");
    const [remark, setRemark] = useState<string>("");

    useEffect(() => {
        getTypes();
    }, []);

    const getTypes = async (): Promise<any> => {
        try {
            const response = await fetch("http://localhost:8000/type", {
                method: "get",
                headers: {"Content-Type": "application/json"},
            });
            // response.json().then((res) => console.log("res", res));

            if (response.status === 200) {
                const data = await response.json() as any;
                console.log("types", data);
                setTypes(data);
                setSubTypes(() => [...data["income"]]);
            }
        } catch (error) {
            console.log("Error fetching type data", error);
        }
    };

    const onTypeChange = (event: any, value: any): void => {
        setSelectedType(value);
        setSelectedSub("");
        if (value === "income") {
            setSubTypes(() => [...types["income"]]);
        } else {
            setSubTypes(() => [...types["expense"]]);
        }
    };

    const onSubTypeChange = (event: any, value: any) => {
        setSelectedSub({
            main: selectedType,
            sub: event.target.value,
        });
    };

    const onSubmit = async (event: any): Promise<any> => {
        event.preventDefault();

        const newTransaction = {
            l_amount: amount,
            type_name: selectedSub.sub,
            remark: remark,
            a_id: 0, // TODO
            ab_id: 0, // TODO
        };

        const response = await fetch("http://localhost:8000/log", {
            method: "post",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(newTransaction),
        });

        console.log("response", response);
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
                        sx={{mb: 2}}
                        InputProps={{
                            inputProps: {min: 0},
                            endAdornment: <InputAdornment position="end">¥</InputAdornment>,
                        }}
                    />
                    <br/>

                    <FormLabel>Type</FormLabel>
                    <RadioGroup value={selectedType} onChange={onTypeChange}>
                        <FormControlLabel
                            value="income"
                            control={<Radio/>}
                            label="Income"
                        />
                        <FormControlLabel
                            value="outcome"
                            control={<Radio/>}
                            label="Expense"
                        />
                    </RadioGroup>
                    <br/>

                    <FormControl fullWidth>
                        <FormLabel>Sub-Type</FormLabel>
                        <Select
                            value={selectedSub.sub || subTypes[0] || ""}
                            onChange={onSubTypeChange}
                            fullWidth
                            size="small"
                            sx={{mb: 2}}
                        >
                            {subTypes[0] &&
                                subTypes.map((subType, i) => (
                                    <MenuItem key={i} value={subType.typeName}>
                                        {subType.typeName}
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

//1. alert empty
//2. type get
//3, style = tab choice
