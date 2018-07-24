using System.Collections.Generic;

namespace RootCodeSample
{
 class LogParser
  {
    public string[] Logs { get; set; }
    public LogParser(string[] logs)
    {
      Logs = logs;
    }
    public IRecordKeeper RecordKeeper { get; set; }
    public void RegisterRecordKeeper(IRecordKeeper recordKeeper)
    {
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