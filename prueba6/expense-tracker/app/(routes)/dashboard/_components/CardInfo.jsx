import { PiggyBank, ReceiptText, SparkleIcon, Sparkles, WalletIcon } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import getFinancialAdvice from '@/utils/getFinancialAdvice';

function CardInfo({budgetList}) {
    
    const [totalBudget,setTotalBudget]=useState(0);
    const [totalSpend,setTotalSpend]=useState(0);
    const[financialAdvice, setFinancialAdvice] = useState('')
    
    useEffect(()=>{
        budgetList&&CalculateCardInfo();
    },[budgetList])

    useEffect(()=>{
        if(totalBudget >= 0 || totalSpend >= 0) {
            const fetchFinancialAdvice = async ()=> {
                const advice = await getFinancialAdvice(totalBudget, totalSpend);
                setFinancialAdvice(advice);
            };
            fetchFinancialAdvice();
        }
    }, [totalBudget, totalSpend]);

    const CalculateCardInfo=()=>{
        console.log(budgetList);
        let totalBudget_=0;
        let totalSpend_=0;
        budgetList.forEach((element) =>{
            totalBudget_=totalBudget_+Number(element.amount);
            totalSpend_=totalSpend_+element.totalSpend;
        });

        setTotalBudget(totalBudget_);
        setTotalSpend(totalSpend_)
        
    }
  return (
    <div>
        {budgetList?.length>0? (
            <div >
                <div className="p-7 border mt-4 rounded-2xl flex items-center justify-between">
                    <div className="">
                        <div className="flex mb-2 flex-row space-x-1 items-center">
                            <h2>Finance Smart AI</h2>
                            <Sparkles className="rounded-full text-white w-10 h-10 p-2
                            bg-gradient-to-r
                            from-pink-500
                            via-red-500
                            to-yellow-500
                            bakground-animate

                            "
                            />
                        </div>
                        <h2 className="font-light text-md">
                            {financialAdvice || "loading financial advice..."}
                        </h2>
                    </div>
                </div>

                <div className="mt-7 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                    <div className="p-7 border rounded-lg flex items-center justify-between">
                        <div>
                            <h2 className="text-sm">Total Budget</h2>
                            <h2 className="font-bold text-2xl">${totalBudget}</h2>
                        </div>
                        <PiggyBank 
                    className="bg-primary p-3 h-12 w-12 rounded-full text-white"/>
                    </div>
                    <div className="p-7 border rounded-lg flex items-center justify-between">
                        <div>
                            <h2 className="text-sm">Total Spend</h2>
                            <h2 className="font-bold text-2xl">${totalSpend}</h2>
                        </div>
                        <ReceiptText className="bg-primary p-3 h-12 w-12 rounded-full text-white"/>
                    </div>
                    <div className="p-7 border rounded-lg flex items-center justify-between">
                        <div>
                            <h2 className="text-sm">No. Of Budget</h2>
                            <h2 className="font-bold text-2xl">{budgetList?.length}</h2>
                        </div>
                        <WalletIcon className="bg-primary p-3 h-12 w-12 rounded-full text-white"/>
                    </div>
                </div>
            :
            <div className="mt-7 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {[1,2,3].map((item,index)=>(
                    <div className="h-[110px] w-full bg-slate-200 animate-pulse rounded-lg">
                        
                    </div>
                ))}
            </div>


            </div>
          ) : (
            <></>
          )}
        </div>
      );
    }

export default CardInfo
