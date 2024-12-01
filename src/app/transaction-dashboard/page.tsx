"use client";
import {
  Pagination,
  Spacer,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { transactionsData } from "./data/mock";
import NumberTicker from "@/components/ui/NumberTicker";
import SparklesText from "@/components/ui/SparklesText";

export default function Page() {
  const [transactions, setTransactions] =
    useState<Array<Transaction>>(transactionsData);
  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.post("api/get-transactions", {
        limit: 10,
      });
      setTransactions(response.data);
      console.log(response.data);
    };
    fetchData();
  }, []);
  const [page, setPage] = React.useState(1);
  const rowsPerPage = 5;

  const pages = Math.ceil(transactions.length / rowsPerPage);

  const items = React.useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return transactions.slice(start, end);
  }, [page, transactions]);
  function getKeyValue(obj: any, key: string): any {
    const keys = key.split(".");
    let value = obj;
    for (const k of keys) {
      value = value[k];
    }
    return value;
  }

  return (
    <div className="px-2 pt-10 min-h-[80vh]">
      <Table
        aria-label="Example table with client side pagination"
        bottomContent={
          <div className="flex w-full justify-center">
            <Pagination
              isCompact
              showControls
              showShadow
              color="primary"
              page={page}
              total={pages}
              onChange={(page) => setPage(page)}
            />
          </div>
        }
        classNames={{
          wrapper: "min-h-[222px]",
        }}
      >
        <TableHeader>
          <TableColumn
            className="text-center text-xs"
            key="merchant_data.category"
          >
            NAME
          </TableColumn>
          <TableColumn className="text-center text-xs" key="amount">
            AMOUNT
          </TableColumn>
          <TableColumn className="text-center text-xs" key="currency">
            CURRENCY
          </TableColumn>
          <TableColumn className="text-center text-xs" key="created">
            CREATED
          </TableColumn>
        </TableHeader>
        <TableBody items={items}>
          {(item) => (
            <TableRow key={item.id}>
              {(columnKey) => (
                <TableCell className="text-center">
                  {getKeyValue(item, columnKey as string)}
                </TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>
      <Spacer y={16} />
      <div className="flex flex-col items-center gap-10 font-line font-black text-5xl">
        <SparklesText text="รายได้ทั้งหมด" />
        <p className="text-4xl font-semibold ">
          <NumberTicker
            value={Math.abs(
              transactions.reduce((acc, item) => acc + item.amount, 0)
            )}
          />{" "}
          บาท
        </p>
      </div>
    </div>
  );
}
