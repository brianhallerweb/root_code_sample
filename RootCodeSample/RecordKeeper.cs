using System;
using System.Collections.Generic;

namespace RootCodeSample
{

  interface IRecordKeeper
  {
    void AddToRecords(string str);
    void LogOutput();
  }
  class RootRecordKeeper : IRecordKeeper
  {
    private Dictionary<string, List<double>> _records = new Dictionary<string, List<double>>();

    public void AddToRecords(string str)
    {
      var strs = str.Split(" ");

      if (strs[0] == "Driver")
      {
        AddDriver(strs[1]);
        return;
      }

      if (strs[0] == "Trip")
      {
        var time = CalculateTime(strs[2], strs[3]);
        AddTrip(strs[1], Convert.ToDouble(strs[4]), time);
        return;
      }
    }
    private void AddDriver(string name)
    {
      if (!_records.ContainsKey(name))
        _records[name] = new List<double>() { 0, 0 };
    }
    private void AddTrip(string name, double distance, double time)
    {
      if (_records.ContainsKey(name))
      {
        _records[name][0] += distance;
        _records[name][1] += time;
      }
    }
    private double CalculateTime(string start, string end)
    {
      var startHours = start.Split(":")[0];
      var startMinutes = start.Split(":")[1];
      var endHours = end.Split(":")[0];
      var endMinutes = end.Split(":")[1];
      var startTime = Convert.ToDouble(startHours) * 60 + Convert.ToDouble(startMinutes);
      var endTime = Convert.ToDouble(endHours) * 60 + Convert.ToDouble(endMinutes);
      return (endTime - startTime) / 60;
    }
    private double Mph(double miles, double time)
    {
      return Math.Round(miles / time, 0);
    }
    public void LogOutput()
    {
      foreach (KeyValuePair<string, List<double>> kv in _records)
      {
        if (kv.Value[0] == 0)
        {
          Console.WriteLine("{0}: 0 miles", kv.Key);
        }
        else
        {
          Console.WriteLine("{0}: {1} miles @ {2} mph", kv.Key, Math.Round(kv.Value[0]), Mph(kv.Value[0], kv.Value[1]));
        }
      }
    }
  }
}