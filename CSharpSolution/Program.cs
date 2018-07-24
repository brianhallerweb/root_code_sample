using System;
using System.Collections.Generic;

namespace RootCodeSample
{
  class Program
  {
    static void Main(string[] args)
    {
      var logs = System.IO.File.ReadAllLines(@"/Users/brianhaller/Documents/javascript_projects/root_code_sample/CSharpSolution/input.txt");
      var logParser = new LogParser(logs, new RootRecordKeeper());
      logParser.Parse();
      logParser.RecordKeeper.LogOutput();
    }
  }
}
