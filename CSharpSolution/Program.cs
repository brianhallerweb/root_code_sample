using System;
using System.Collections.Generic;

namespace RootCodeSample
{
  class Program
  {
    static void Main(string[] args)
    {
      var logs = System.IO.File.ReadAllLines(@"/Users/brianhaller/Documents/c#_projects/RootCodeSample/input.txt");
      var logParser = new LogParser(logs);
      logParser.RegisterRecordKeeper(new RootRecordKeeper());
      logParser.Parse();
      logParser.RecordKeeper.LogOutput();
    }
  }
}
