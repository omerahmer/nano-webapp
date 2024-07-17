import sys
import os
import inspect
# Import the .NET Common Language Runtime (CLR) to allow interaction with .NET
import clr
import numpy as np
import time 



print ("Python %s\n\n" % (sys.version,))

strCurrFile = os.path.abspath (inspect.stack()[0][1])
print ("Executing File = %s\n" % strCurrFile)

# Initialize the DLL folder path to where the DLLs are located
strPathDllFolder = os.path.dirname (strCurrFile)
print ("Executing Dir  = %s\n" % strPathDllFolder)

# Add the DLL folder path to the system search path (before adding references)
sys.path.append (strPathDllFolder)

# Add a reference to each .NET assembly required
clr.AddReference ("UsbDllWrap")

# Import a class from a namespace
from Newport.USBComm import *
from System.Text import StringBuilder
from System.Collections import Hashtable
from System.Collections import IDictionaryEnumerator

class Sender():
    def __init__(self,commands):
# Call the class constructor to create an object
        oUSB = USB (True)

# Discover all connected devices
        bStatus = oUSB.OpenDevices (0, True)
        if (bStatus) :
            oDeviceTable = oUSB.GetDeviceTable ()
            nDeviceCount = oDeviceTable.Count
            print ("Device Count = %d" % nDeviceCount)

            # If no devices were discovered
            if (nDeviceCount == 0) :
                print ("No discovered devices.\n")
            else :   
                oEnumerator = oDeviceTable.GetEnumerator ()
                strDeviceKeyList = np.array ([])

                # Iterate through the Device Table creating a list of Device Keys
                for nIdx in range (0, nDeviceCount) :
                    if (oEnumerator.MoveNext ()) :
                        strDeviceKeyList = np.append (strDeviceKeyList, oEnumerator.Key)

                print (strDeviceKeyList)
                print ("\n")

                strBldr = StringBuilder (64)

        # Iterate through the list of Device Keys and query each device with *IDN?
    
            commands = ["2PA0","1PA0","2PA1000","1PA0","2PA1000","1PA1000","2PA2000","1PA1000","2PA2000","1PA2000","2PA0","1PA3000"]
            
            pixel_area = 4
            spot_size = 3
            travel_time = 3
            step_size = 3
            exposure_shot_number = pixel_area/spot_size

            exposure_time = pixel_area * travel_time / step_size

            for oDeviceKey in strDeviceKeyList :
                strDeviceKey = str (oDeviceKey)
                print (strDeviceKey)
                strBldr.Remove (0, strBldr.Length)
                
                nReturn = oUSB.Query (strDeviceKey, "*IDN?", strBldr)
                print ("Return Status = %d" % nReturn)
                print ("PA Response = %s\n" % strBldr.ToString ())

                for command in commands:
                    nReturn = oUSB.Query (strDeviceKey, command, strBldr)
                    print ("Return Status = %d" % nReturn)
                    print ("Response = %s\n" % strBldr.ToString ())
                # time.sleep(waitTime)


                nReturn = oUSB.Query (strDeviceKey, "2PA1000;1PA1000;2PA0;1PA0;2PA2000;1PA1000;2PA0;1PA0;2PA2000;1PA2000;2PA0;1PA0;", strBldr)
                print ("Return Status = %d" % nReturn)
                print ("PA Response = %s\n" % strBldr.ToString ())
            '''
            nReturn = oUSB.Query (strDeviceKey, "1PA?", strBldr)
            print ("Return Status = %d" % nReturn)
            print ("PA? Response = %s\n" % strBldr.ToString ())

            nReturn = oUSB.Query (strDeviceKey, "1PA0", strBldr)
            print ("Return Status = %d" % nReturn)
            print ("PA Response = %s\n" % strBldr.ToString ())

            nReturn = oUSB.Query (strDeviceKey, "1PA?", strBldr)
            print ("Return Status = %d" % nReturn)
            print ("PA? Response = %s\n" % strBldr.ToString ())
            '''

        else :
            print ("\n***** Error:  Could not open the devices. *****\n\nCheck the log file for details.\n")

            # Shut down all communication
        oUSB.CloseDevices ()
        print ("Devices Closed.\n")
