using System.Collections.Generic;

namespace RootCodeSample
{
 class LogParser
  {
    public string[] Logs { get; set; }
    public IRecordKeeper RecordKeeper { get; set; }
    public LogParser(string[] logs, IRecordKeeper recordKeeper)
    {
      Logs = logs;
      RecordKeeper = recordKeeper;
    }
  

    public void Parse()
    {
      foreach (var log in Logs)
      {
        RecordKeeper.AddToRecords(log);
      }
    }
  }
}