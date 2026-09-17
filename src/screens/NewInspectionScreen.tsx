import React, { useState } from 'react';
import { ScreenId, InspectionRecord } from '../types';
import { Upload, X, ArrowRight, CheckCircle2 } from 'lucide-react';

interface NewInspectionScreenProps {
  onNavigate: (screen: ScreenId) => void;
  onStartAnalysis: (newInspectionData: Partial<InspectionRecord>, imageBase64: string) => void;
}

export function NewInspectionScreen({ onNavigate, onStartAnalysis }: NewInspectionScreenProps) {
  const [productName, setProductName] = useState('Packaged Tea 500 g');
  const [brand, setBrand] = useState('Taj Mahal Leaf');
  const [manufacturer, setManufacturer] = useState('Hindustan Unilever Ltd.');
  const [category, setCategory] = useState('Beverages');
  const [batchNumber, setBatchNumber] = useState('TM-2026-X9');
  const [mrp, setMrp] = useState('₹340');
  const [netQuantity, setNetQuantity] = useState('500 g');

  const [images, setImages] = useState<string[]>([
    'https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&q=80&w=800'
  ]);

  const handleAddSampleImage = () => {
    const samples = [
      'https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1558961363-fa8fdf82db35?auto=format&fit=crop&q=80&w=800'
    ];
    const randomImg = samples[Math.floor(Math.random() * samples.length)];
    setImages([...images, randomImg]);
  };

  const removeImage = (index: number) => {
    setImages(images.filter((_, i) => i !== index));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const primaryImg = images[0] || 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&q=80&w=800';
    onStartAnalysis({
      inspectionId: `LM-${Math.floor(10000 + Math.random() * 90000)}`,
      productName,
      brand,
      manufacturer,
      category,
      batchNumber,
      mrp,
      netQuantity,
      date: '17 Sep 2026',
      officer: 'Rajesh Kumar',
      images
    }, primaryImg);
    onNavigate('analysis');
  };

  const handleSaveOffline = () => {
    const draft = {
      inspectionId: `LM-${Math.floor(10000 + Math.random() * 90000)}`,
      productName,
      brand,
      manufacturer,
      category,
      batchNumber,
      mrp,
      netQuantity,
      date: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
      officer: 'Rajesh Kumar',
      status: 'Needs Review',
      images
    };
    try {
      const existing = JSON.parse(localStorage.getItem('legal_metrology_pending_forms') || '[]');
      existing.push(draft);
      localStorage.setItem('legal_metrology_pending_forms', JSON.stringify(existing));
      alert('Inspection form cached offline successfully! It will sync automatically when connectivity is restored.');
      onNavigate('dashboard');
    } catch (err) {
      console.error(err);
      alert('Failed to save offline cache.');
    }
  };

  return (
    <div className="p-8 max-w-5xl mx-auto space-y-8">
      {/* Step Indicator */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
        <div className="flex items-center justify-between text-xs font-medium text-slate-500">
          <span className="flex items-center gap-1.5 text-blue-600 font-semibold">
            <span className="w-5 h-5 rounded-full bg-blue-600 text-white flex items-center justify-center text-[10px]">1</span>
            Product
          </span>
          <span className="h-px bg-slate-200 flex-1 mx-4"></span>
          <span className="flex items-center gap-1.5 text-blue-600 font-semibold">
            <span className="w-5 h-5 rounded-full bg-blue-600 text-white flex items-center justify-center text-[10px]">2</span>
            Upload
          </span>
          <span className="h-px bg-slate-200 flex-1 mx-4"></span>
          <span className="flex items-center gap-1.5 text-slate-400">
            <span className="w-5 h-5 rounded-full bg-slate-200 text-slate-600 flex items-center justify-center text-[10px]">3</span>
            Analysis
          </span>
          <span className="h-px bg-slate-200 flex-1 mx-4"></span>
          <span className="flex items-center gap-1.5 text-slate-400">
            <span className="w-5 h-5 rounded-full bg-slate-200 text-slate-600 flex items-center justify-center text-[10px]">4</span>
            Review
          </span>
          <span className="h-px bg-slate-200 flex-1 mx-4"></span>
          <span className="flex items-center gap-1.5 text-slate-400">
            <span className="w-5 h-5 rounded-full bg-slate-200 text-slate-600 flex items-center justify-center text-[10px]">5</span>
            Report
          </span>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-slate-900">New Inspection</h2>
          <p className="text-xs text-slate-500 mt-0.5">Enter packaged commodity metadata and upload inspection photographs.</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Section 1: Product Information */}
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs space-y-5">
          <h3 className="text-base font-semibold text-slate-900 pb-3 border-b border-slate-100">Product Information</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                Product Name
              </label>
              <input
                type="text"
                required
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
                className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600"
                placeholder="e.g. Packaged Rice 5 kg"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                Brand
              </label>
              <input
                type="text"
                required
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
                className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600"
                placeholder="e.g. India Gate"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                Manufacturer / Packer
              </label>
              <input
                type="text"
                required
                value={manufacturer}
                onChange={(e) => setManufacturer(e.target.value)}
                className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600"
                placeholder="e.g. ABC Foods Pvt. Ltd."
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                Product Category
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600"
              >
                <option value="Grains & Pulses">Grains & Pulses</option>
                <option value="Edible Oils">Edible Oils</option>
                <option value="Bakery & Snacks">Bakery & Snacks</option>
                <option value="Beverages">Beverages</option>
                <option value="Spices & Condiments">Spices & Condiments</option>
                <option value="Household & Cleaning">Household & Cleaning</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                Batch / Lot Number
              </label>
              <input
                type="text"
                required
                value={batchNumber}
                onChange={(e) => setBatchNumber(e.target.value)}
                className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600"
                placeholder="e.g. LOT-2026-89A"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                  MRP
                </label>
                <input
                  type="text"
                  required
                  value={mrp}
                  onChange={(e) => setMrp(e.target.value)}
                  className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600"
                  placeholder="₹420"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                  Net Quantity
                </label>
                <input
                  type="text"
                  required
                  value={netQuantity}
                  onChange={(e) => setNetQuantity(e.target.value)}
                  className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600"
                  placeholder="5 kg"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Section 2: Product Images */}
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs space-y-5">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div>
              <h3 className="text-base font-semibold text-slate-900">Product Images</h3>
              <p className="text-xs text-slate-500">Upload clear photographs of the product packaging.</p>
            </div>
            <span className="text-xs font-medium text-slate-500">Supports: Front, Back, Side, Label</span>
          </div>

          {/* Upload Box */}
          <div
            onClick={handleAddSampleImage}
            className="border-2 border-dashed border-slate-300 hover:border-blue-500 bg-slate-50/50 hover:bg-blue-50/30 rounded-xl p-8 text-center cursor-pointer transition-all"
          >
            <div className="w-12 h-12 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center mx-auto mb-3">
              <Upload className="w-6 h-6" />
            </div>
            <p className="text-sm font-semibold text-slate-800">Click to upload or drag and drop package photos</p>
            <p className="text-xs text-slate-500 mt-1">PNG, JPG, WEBP up to 25MB (Multi-angle photos recommended)</p>
            <button
              type="button"
              onClick={(e) => { e.stopPropagation(); handleAddSampleImage(); }}
              className="mt-4 px-3 py-1.5 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 rounded-lg text-xs font-medium shadow-xs"
            >
              + Add Sample Photo
            </button>
          </div>

          {/* Thumbnails */}
          {images.length > 0 && (
            <div className="space-y-3">
              <p className="text-xs font-semibold text-slate-700 uppercase tracking-wider">Uploaded Photographs ({images.length})</p>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {images.map((img, idx) => (
                  <div key={idx} className="relative group bg-slate-100 rounded-lg border border-slate-200 overflow-hidden aspect-video">
                    <img src={img} alt={`Package view ${idx + 1}`} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-slate-900/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <button
                        type="button"
                        onClick={() => removeImage(idx)}
                        className="p-1.5 bg-rose-600 text-white rounded-lg hover:bg-rose-700 transition-colors"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                    <span className="absolute bottom-1 left-1 px-1.5 py-0.5 bg-slate-900/70 text-white text-[10px] rounded">
                      {idx === 0 ? 'Front Panel' : idx === 1 ? 'Back Label' : `Side ${idx}`}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Submit Bottom Bar */}
        <div className="flex items-center justify-between pt-4">
          <button
            type="button"
            onClick={handleSaveOffline}
            className="px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold rounded-lg text-sm transition-colors border border-slate-300 shadow-xs flex items-center gap-2"
          >
            <span>Save to Offline Cache</span>
          </button>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => onNavigate('dashboard')}
              className="px-5 py-2.5 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 font-medium rounded-lg text-sm transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg text-sm transition-colors flex items-center gap-2 shadow-sm"
            >
              <span>Start Analysis</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
