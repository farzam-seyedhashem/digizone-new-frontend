import {Dialog, Transition, TransitionChild} from '@headlessui/react'
import {useState} from 'react'
import Icon from "@m3/assets/icons/Icon";
import Button from "@m3/buttons/Button";

export default function FilterDialog({open, setOpen, children}) {
    // const [open, setOpen] = useState(false)

    return (
        <>
            <Transition show={open}>
                {/* Backdrop */}
                <TransitionChild>
                    <div
                        className="fixed inset-0 z-[1002] bg-black/30 transition duration-300 data-[closed]:opacity-0"
                        onClick={() => setOpen(false)}
                    />
                </TransitionChild>

                {/* Slide-in sidebar */}
                <TransitionChild>
                    <Dialog onClose={() => setOpen(false)}
                            className={"md:rounded-r-[16px] fixed inset-y-0 left-0 z-[1002] bg-surface-container-low-light dark:bg-surface-container-low-dark w-full md:w-[380px] transition duration-300 data-[closed]:translate-y-full md:data-[closed]:-translate-x-full"}>
                        <form
                            className="">
                            <div
                                className={"flex items-center text-on-surface-light dark:text-on-surface-dark py-6 pl-6 pr-4 border-b border-outline-variant-light dark:border-outline-variant-dark"}>
                                <Icon onClick={() => setOpen(false)}>
                                    arrow_forward
                                </Icon>
                                <h3 className={"text-title-large mr-2"}>
                                    فیلتر کردن محصولات
                                </h3>
                            </div>
                            <div className={"py-6 h-[calc(100vh_-_148px)] overflow-scroll "}>
                                {children}
                            </div>
                            <div className={"px-6 py-4 justify-end flex border-t border-outline-light dark:border-outline-dark items-center"}>
                                <Button>
                                    انصراف
                                </Button>
                                <Button variant={"filled"}>
                                    فیلتر
                                </Button>
                            </div>
                        </form>
                    </Dialog>
                </TransitionChild>
            </Transition>
        </>
    )
}