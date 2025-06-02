import React from 'react';

const MetricForm = ({ metricData, setMetricData }) => (
  <div className="border p-4 rounded mb-4">
    <h2 className="text-xl font-semibold mb-4">Metric Details</h2>
    <div className="grid grid-cols-2 gap-4">
      <input
        type="text"
        placeholder="Metric Name"
        value={metricData.name}
        onChange={e => setMetricData({ ...metricData, name: e.target.value })}
        className="p-2 border rounded"
        required
      />
      <input
        type="number"
        placeholder="Value"
        value={metricData.value}
        onChange={e => setMetricData({ ...metricData, value: e.target.value })}
        className="p-2 border rounded"
        required
      />
      <input
        type="number"
        placeholder="Year"
        value={metricData.year}
        onChange={e => setMetricData({ ...metricData, year: e.target.value })}
        className="p-2 border rounded"
        required
      />
      <input
        type="text"
        placeholder="Unit"
        value={metricData.unit}
        onChange={e => setMetricData({ ...metricData, unit: e.target.value })}
        className="p-2 border rounded"
        required
      />
    </div>
  </div>
);

export default MetricForm;
