import { useState } from "react"
import { motion } from "framer-motion"

// import assets
import BG from "./assets/images/bg-sidebar-desktop.svg"
import BGMobile from "./assets/images/bg-sidebar-mobile.svg"
import ThanksIcon from "./assets/images/icon-thank-you.svg"
import ArcadeIcon from "./assets/images/icon-arcade.svg"
import AdvancedIcon from "./assets/images/icon-advanced.svg"
import ProIcon from "./assets/images/icon-pro.svg"
import CheckIcon from "./assets/images/icon-checkmark.svg"

// import componens
import TextField from "./components/TextField"
import { useFormik } from "formik"
import { personalInfoSchema } from "./assets/schemas"

function App() {

  // states
  const steps = [
    {
      step: 1,
      text: 'Your Info'
    },
    {
      step: 2,
      text: 'Select Plan'
    },
    {
      step: 3,
      text: 'Add-ons'
    },
    {
      step: 4,
      text: 'Summary'
    }
  ]
  const [currentStep, setCurrentStep] = useState(1)

  // STEP TWO
  const [plan, setPlan] = useState(['Arcade', 9])
  const [isMonthly, setIsMonthly] = useState(true)
  // STEP THREE
  const [addonsSelect, setAddonsSelect] = useState([])

  // functions
  const handdleStep = (e) => {
    setCurrentStep(e)
  }

  return (
    <div className=" relative">
      <div className=" absolute md:hidden">
        <img className=" top-0 left-0 w-[100vw]" src={BGMobile} alt="" />
      </div>
      <div className=" font-Ubunto bg-magnolia h-screen flex md:items-center justify-center">
        <div className=" relative bg-white flex flex-col md:flex-row w-[945px] mx-[2vh] p-4 rounded-2xl md:h-[600px] h-fit shadow-md mt-28 md:mt-0">
          {/* steps */}
          <div className="md:flex overflow-hidden md:relative fixed top-0 left-[50%] md:left-0 -translate-x-[50%] md:translate-x-0 md:bg-purplish-blue text-white md:h-full min-w-[280px] rounded-xl p-8">
            <div className=" relative z-10 flex flex-row md:flex-col gap-[32px]">
              {steps.map((item, i) => {
                return (
                  <div
                    key={i}
                    onClick={() => handdleStep(item.step)}
                    className="flex cursor-pointer items-center gap-x-2">
                    <div
                      className={`${currentStep === item.step ? ' bg-light-blue text-black' : ''} border rounded-full w-8 h-8 grid place-content-center`}>
                      <span>{item.step}</span>
                    </div>
                    <div className=" md:flex flex-col hidden">
                      <span className=" text-xs opacity-50">STEP {item.step}</span>
                      <span className=" uppercase tracking-wider text-sm font-bold ">{item.text}</span>
                    </div>
                  </div>
                )
              })}
            </div>
            {/* bg */}
            <img className="md:absolute md:block hidden  bottom-0 left-0 w-full" src={BG} alt="" />
          </div>

          {/* render */}
          <div className=" md:p-[35px] md:pb-5 p-5 px-50 mx-auto flex flex-col justify-between">
            {currentStep === 1 &&
              <StepOne />
            }
            {currentStep === 2 &&
              <StepTwo plan={plan} setPlan={setPlan} isMonthly={isMonthly} setIsMonthly={setIsMonthly} />
            }
            {currentStep === 3 &&
              <StepThree isMonthly={isMonthly} addonsSelect={addonsSelect} setAddonsSelect={setAddonsSelect} />
            }
            {currentStep === 4 &&
              <StepFour
                plan={plan}
                isMonthly={isMonthly}
                addonsSelect={addonsSelect}
              />
            }
            {currentStep === 5 &&
              <Thanks />
            }
            {currentStep < 5 &&
              <div className=" md:relative flex justify-between fixed bottom-0 left-0 right-0 md:bg-transparent bg-white p-[20px] md:p-0">
                {currentStep < 2 ? <i></i> :
                  <button
                    onClick={() => setCurrentStep(currentStep - 1)}
                    className={` hover:text-marine-blue hover:font-bold`}>Go Back</button>
                }
                <button
                  onClick={() => setCurrentStep(currentStep + 1)}
                  className=" hover:opacity-90 bg-marine-blue text-white p-3 px-6 rounded-md">Next Step</button>
              </div>
            }
          </div>
        </div>
      </div>
    </div>
  )
}

export default App


function StepOne() {
  const onSubmit = () => {
    console.log("submitted")
  }
  const { errors, values, handleChange, onBlur, handleSubmit } = useFormik({
    initialValues: {
      name: "",
      email: "",
      phoneNumber: "",
    },
    validationSchema: personalInfoSchema,
    onSubmit,
  })
  console.log(errors)
  return (
    <motion.div
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 50 }}
    >
      <h1 className="heading">Personal Info</h1>
      <p className="subtitle">Please provide your name, email address, and phone number.</p>

      <form onSubmit={handleSubmit} action="">
        <TextField
          value={values.name}
          onChange={handleChange}
          onBlur={onBlur}
          name="name"
          type="text"
          placeholder="e.g. Stephen King"
          label="Name"
          className={errors.name && 'input-error'}
        />
        <TextField
          value={values.email}
          onChange={handleChange}
          onBlur={onBlur}
          name="email"
          type="email"
          placeholder="e.g. stephenking@lorem.com"
          label="Email Address"
          className={errors.email && 'input-error'}
        />
        <TextField
          value={values.phoneNumber}
          onChange={handleChange}
          onBlur={onBlur}
          name="phoneNumber"
          type="text"
          placeholder="e.g. +1 234 567 890"
          label="Phone Number"
          className={errors.phoneNumber && 'input-error'}
        />
      </form>
    </motion.div>
  )
}
function StepTwo({ plan, setPlan, isMonthly, setIsMonthly }) {

  const plans = [
    {
      icon: ArcadeIcon,
      name: 'Arcade',
      priceMo: 9,
      priceYr: 90
    },
    {
      icon: AdvancedIcon,
      name: 'Advanced',
      priceMo: 12,
      priceYr: 120
    },
    {
      icon: ProIcon,
      name: 'Pro',
      priceMo: 15,
      priceYr: 150
    }
  ]

  const handleSetPlan = (name, priceMo, priceYr) => {
    if (isMonthly === true)
      setPlan([name, priceMo])
    else
      setPlan([name, priceYr])
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 50 }}
    >
      <h1 className="heading">Select your plan</h1>
      <p className="subtitle">You have the option of monthly or yearly billing.</p>
      <div className="grid md:grid-cols-3  gap-4">
        {plans.map((item, i) => {
          return (
            <div
              key={i}
              onClick={() => handleSetPlan(item.name, item.priceMo, item.priceYr)}
              className={`${plan[0] === item.name ? ' border-purplish-blue bg-purplish-blue/10' : ''} cursor-pointer hover:border-purplish-blue rounded-md p-4 pr-9 flex md:flex-col border w-full gap-x-4`}>
              <img className=" w-8" src={item.icon} alt="" />
              <div className=" md:mt-8 flex-col flex">
                <span className="text-marine-blue font-bold">{item.name}</span>
                <span className=" bodytext">${isMonthly ? item.priceMo : item.priceYr}{isMonthly ? '/mo' : '/yr'}</span>
                {isMonthly ? '' :
                  <span className=" text-xs text-marine-blue">
                    2 months free
                  </span>
                }
              </div>
            </div>
          )
        })}

      </div>
      {/* toggle */}
      <div className=" mt-7 flex items-center justify-center gap-x-4 bg-magnolia rounded-lg p-3 ">
        <span className={`${isMonthly && ' text-marine-blue font-bold'}`}>Monthly</span>
        <div
          onClick={() => setIsMonthly(!isMonthly)}
          className={` cursor-pointer relative flex transition-all duration-500 bg-marine-blue w-[40px] h-[20px] rounded-full p-[2px]`}>
          <div className={`${isMonthly ? ' left-[0px]  right-[20px] ' : ' left-[20px]  right-[0px] '} transition-all duration-500 rounded-full bg-white absolute top-0 bottom-0 m-[3px]`}></div>
        </div>
        <span className={`${!isMonthly && ' text-marine-blue font-bold'}`}>Yearly</span>
      </div>

    </motion.div>
  )
}
function StepThree({ addonsSelect, setAddonsSelect, isMonthly }) {
  const addons = [
    {
      id: 0,
      name: 'Online service',
      info: 'Access to multiplayer games',
      price: 1
    },
    {
      id: 1,
      name: 'Larger storage',
      info: 'Extra 1TB of cloud save',
      price: 2
    },
    {
      id: 2,
      name: 'Customizable profile',
      info: 'Custom theme on your profile',
      price: 2
    }
  ]
  const ids = addonsSelect.map((obj) => obj.id);
  // funtions
  const handleAddAddons = (aid, name, price) => {
    const newAddons = {
      id: aid,
      name: name,
      price: price
    }
    if (ids.includes(aid)) {
      return (
        <></>
      )
    } else {
      setAddonsSelect([...addonsSelect, newAddons])
    }
  }
  const handleRemoveAddons = (aid) => {
    const newAddons = addonsSelect.filter((a) => a.id !== aid)
    if (ids.includes(aid)) {
      return (
        setAddonsSelect(newAddons)
      )
    } else {

    }
  }
  const handleClickAddons = (aid, name, price) => {
    handleAddAddons(aid, name, price)
    handleRemoveAddons(aid)
  }
  return (
    <motion.div
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 50 }}
    >
      <h1 className="heading">Pick add-ons</h1>
      <p className="subtitle">You have the option of monthly or yearly billing.</p>
      <div className="flex flex-col gap-y-4">
        {addons.map((item, i) => {
          return (
            <div
              key={item.id}
              onClick={() => handleClickAddons(item.id, item.name, item.price)}
              className={`${ids.includes(item.id) ? ' border-purplish-blue bg-purplish-blue/10' : ''} cursor-pointer hover:border-purplish-blue rounded-md p-3 px-6 flex items-center border w-full`}>

              {/* check */}
              <div
                className={`${ids.includes(item.id) ? 'bg-purplish-blue' : ''} border w-5 h-5 rounded-md grid place-content-center mr-6`}>
                {ids.includes(item.id) &&
                  <img src={CheckIcon} alt="" />
                }
              </div>
              <div className="flex-col flex flex-1">
                <span className="text-marine-blue font-bold">{item.name}</span>
                <p className="bodytext">
                  {item.info}
                </p>
              </div>
              <span className=" text-purplish-blue text-sm">+${item.price}/{isMonthly ? 'mo' : 'yr'}</span>
            </div>
          )
        })}
      </div>
    </motion.div>
  )
}
function StepFour({ plan, isMonthly, addonsSelect, }) {

  // sumar all prices
  const totalPrices = addonsSelect.reduce((accumulator, object) => {
    return accumulator + object.price;
  }, 0);
  return (
    <motion.div
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 50 }}
    >
      <h1 className="heading">Finishing up</h1>
      <p className="bodytext">
        Double-check everything looks OK before confirming.
      </p>
      <div className=" text-gray-400 bg-magnolia p-4 mt-10 px-6 rounded-lg">
        <div className="flex items-center justify-between">
          <div className=" flex flex-col">
            <span className=" text-marine-blue font-bold">{plan[0]} ({isMonthly ? 'Monthly' : 'Yearly'})</span>
            <span className=" underline">Change</span>
          </div>
          <span className=" text-marine-blue font-bold">${plan[1]}/{isMonthly ? 'mo' : 'yr'}</span>
        </div>
        {addonsSelect.length > 0 && <hr className=" my-4" />}
        <div className=" flex flex-col gap-y-2">
          {addonsSelect.map((item) => (
            <div
              key={item.id}
              className=" text-sm flex justify-between items-center">
              <span>{item.name}</span>
              <span className=" text-marine-blue">+${item.price}/{isMonthly ? 'mo' : 'yr'}</span>
            </div>
          ))}
        </div>
      </div>
      <div className=" px-6 mt-6 text-gray-500 flex items-center justify-between">
        <span>Total ({isMonthly ? 'per month' : 'yearly'})</span>
        <span className=" text-lg font-bold text-purplish-blue">+${plan[1] + totalPrices}/{isMonthly ? 'mo' : 'yr'}</span>
      </div>
    </motion.div>
  )
}
function Thanks() {
  return (
    <motion.div
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 50 }}
      className="flex flex-col items-center h-full w-full justify-center"
    >
      <img src={ThanksIcon} alt="" />
      <h1 className=" mt-7 mb-4 heading">Thanks you!</h1>
      <p className="bodytext text-center w-[80%]">
        Thanks for confirming your subscription! We hope you have fun
        using our platform. If you ever need support, please feel free
        to email us at support@loremgaming.com.
      </p>
    </motion.div>
  )
}
